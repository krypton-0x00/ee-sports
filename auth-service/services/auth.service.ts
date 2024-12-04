import type { Request } from "express";
import type AuthRepository from "../repo/auth.repo";
import type { AuthServiceTypes } from "./types/authService.types";
import bcrypt from "bcryptjs";
import handleError from "../utils/routeErrorHandler.util";
import createResponse from "../utils/createResponse.util";
import {
  DeleteAccountSchema,
  forgetPasswordSchema,
  idSchema,
  LoginSchema,
  RegisterSchema,
  resetPasswordSchema,
  VerifyEmailSchema,
} from "../validation/auth.validation";
import { z } from "zod";
import generateResetToken from "../utils/generateResetToken.util";

export default class AuthService {
  private authRepo;

  constructor(authRepo: AuthRepository) {
    this.authRepo = authRepo;
  }

  async register(req: Request): Promise<AuthServiceTypes.ReturnResponse> {
    try {
      const { email, username, password } = RegisterSchema.parse(req.body);

      if (!email || !username || !password) {
        return createResponse(400, false, "All Fields Are Required");
      }
      const doesExist = await this.authRepo.getUserByEmail(email);

      if (doesExist) {
        return createResponse(409, false, "User already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.authRepo.addUser({
        email,
        username,
        passwordHash: hashedPassword,
      });

      return createResponse(201, true, "User Created");
    } catch (error) {
      if (error instanceof z.ZodError) {
        return createResponse(400, false, "Validation Failed", error.errors);
      }
      return handleError(error, "AuthService:RegisterFn");
    }
  }
  async login(req: Request): Promise<AuthServiceTypes.ReturnResponse> {
    try {
      const { email, password } = LoginSchema.parse(req.body);
      if (!email || !password) {
        return createResponse(400, false, "All Fields Are Required");
      }
      const user = await this.authRepo.getUserByEmail(email);
      if (!user) {
        return createResponse(401, false, "Invalid email or password");
      }

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

      if (!isPasswordValid) {
        return createResponse(401, false, "Invalid email or password");
      }

      return createResponse(200, true, "Login Successfully");
    } catch (error) {
      if (error instanceof z.ZodError) {
        return createResponse(400, false, "Validation Failed: ", error.errors);
      }
      return handleError(error, "AuthService:LoginFn");
    }
  }
  async DeleteAccount(req: Request): Promise<AuthServiceTypes.ReturnResponse> {
    try {
      const { id } = DeleteAccountSchema.parse(req.body);
      if (!id) {
        return createResponse(400, false, "Missing Required Fields");
      }
      const deleteUser = await this.authRepo.deleteUserById(id);
      if (!deleteUser) {
        return createResponse(401, false, "Invalid user id");
      }
      return createResponse(200, true, "Account Deleted Successfully");
    } catch (error) {
      if (error instanceof z.ZodError) {
        return createResponse(400, false, "Validation Failed: ", error.errors);
      }
      return handleError(error, "AuthService:Delete Account");
    }
  }
  async verifyEmail(req: Request) {
    try {
      const { code, email } = VerifyEmailSchema.parse(req.body);
      if (!code) {
        return createResponse(401, false, "Otp is required.");
      }
      const user = await this.authRepo.getUserByEmail(email);
      if (!user) {
        return createResponse(401, false, "User Not Found");
      }
      const isOtpValid = user.verificationToken === code;

      if (!isOtpValid) {
        return createResponse(400, false, "Invalid OTP.");
      }
      await this.authRepo.updateUserById(user.id, {
        verificationToken: null,
        verificationExpiresAt: null,
        emailVerified: true,
        lastLogin: new Date(),
      });
      return createResponse(200, true, "Email Verified.");
    } catch (error) {
      if (error instanceof z.ZodError) {
        return createResponse(400, false, "Validation Failed: ", error.errors);
      }
      return handleError(error, "AuthService: verifyEmailFN");
    }
  }
  async checkAuth(req: Request) {
    try {
      const id: string = idSchema.parse(req.body);
      if (!id) {
        return createResponse(401, false, "Id is required");
      }
      const user = await this.authRepo.getUserById(id);

      return createResponse(200, true, "User Found", user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return createResponse(409, false, "Validation Failed: ", error.errors);
      }
      return handleError(error, "AuthService: checkAuthFN");
    }
  }
  async forgetPassword(req: Request) {
    try {
      const { email } = forgetPasswordSchema.parse(req.body);
      if (!email) {
        return createResponse(401, false, "Email is Required");
      }
      const user = await this.authRepo.getUserByEmail(email);
      if (!user) {
        return createResponse(400, false, "User not found");
      }
      const resetToken = generateResetToken();
      const tokenExpiry = Date.now() + 60 * 60 * 1000; // 1 hr

      await this.authRepo.updateUserById(user.id, {
        resetPasswordToken: resetToken,
        resetPasswordExpiry: new Date(tokenExpiry),
      });

      //   TODO: Send Mail

      return createResponse(200, true, "Verifaction Code sent to your email");
    } catch (error) {
      if (error instanceof z.ZodError) {
        return createResponse(409, false, "Validation Failed: ", error.errors);
      }
      return handleError(error, "AuthService: forgetPasswordFN");
    }
  }

  async resetPassword(req: Request) {
    try {
      const token = req.params.token;
      const { password, confirmPassword } = resetPasswordSchema.parse(req.body);

      if (!token) {
        return createResponse(401, false, "Token not providied ");
      }
      if (password !== confirmPassword) {
        return createResponse(401, false, "Passwords do not match.");
      }

      const user = await this.authRepo.getUserByToken(token);
      if (!user) {
        return createResponse(
          400,
          false,
          "User not found or the token has been expired ."
        );
      }
      const hashedPassword: string = await bcrypt.hash(password, 10);

      await this.authRepo.updateUserById(user.id, {
        passwordHash: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpiry: null,
      });
      return createResponse(201, true, "Password Changed Successfully");
    } catch (error) {
      if (error instanceof z.ZodError) {
        return createResponse(409, false, "Validation Failed: ", error.errors);
      }
      return handleError(error, "AuthService: forgetPasswordFN");
    }
  }
}
