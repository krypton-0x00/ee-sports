import { type Request, type Response } from "express";
import { prisma } from "../prisma/prismaClient";
import AuthRepository from "../repo/auth.repo";
import AuthService from "../services/auth.service";
import { sendError, sendSuccess } from "../utils/responseHanlder.util";
import Cookie from "../utils/cookie.util";
import { authCookieName } from "../constants";

const authRepo = new AuthRepository(prisma);
const authService = new AuthService(authRepo);

export default class AuthController {
  private static async handleServiceCall(
    req: Request,
    res: Response,
    serviceMethod: Function
  ) {
    try {
      const response = await serviceMethod(req);
      console.log(response.statusCode)
      sendSuccess(res, response.statusCode, response);
    } catch (error) {
      console.error("[-] Error occured in AuthController:LoginFN", error);
      sendError(res, 500, "Internal Server Error ");
    }
  }

  public static login(req: Request, res: Response) {
    return AuthController.handleServiceCall(req, res, authService.login.bind(authService));
  }

  public static register(req: Request, res: Response) {
    return AuthController.handleServiceCall(req, res, authService.register.bind(authService));
  }

  public static verifyEmail(req: Request, res: Response) {
    return AuthController.handleServiceCall(req, res, authService.verifyEmail.bind(authService));
  }

  public static checkAuth(req: Request, res: Response) {
    return AuthController.handleServiceCall(req, res, authService.checkAuth.bind(authService));
  }

  public static forgetPassword(req: Request, res: Response) {
    return AuthController.handleServiceCall(
      req,
      res,
      authService.forgetPassword.bind(authService)
    );
  }

  public static resetPassword(req: Request, res: Response) {
    return AuthController.handleServiceCall(
      req,
      res,
      authService.resetPassword.bind(authService)
    );
  }

  public static logout(req: Request, res: Response) {
    return Cookie.removeCookie(res, authCookieName);
  }
}
