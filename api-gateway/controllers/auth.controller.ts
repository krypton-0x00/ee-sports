import axios, { type AxiosResponse } from "axios";
import type { NextFunction, Request, Response } from "express";
import CookieUtils from "../utils/auth.util";
import type ResponseType from "../types/response.type";
import customResourceResponse from "../utils/customResourceResponse.util";
import createResponse from "../utils/response.util";

//TODO:-change any types on Promise<any>

export default class AuthService {
  private authUrl: string;

  constructor(authServiceURL: string) {
    this.authUrl = authServiceURL;
  }
  async VerifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token: string = req.cookies.token;
      const response: AxiosResponse<any> = await axios.post(
        this.authUrl + "/verify",
        token
      );
      if (response.data.success) {
        next();
      }
      return res
        .status(customResourceResponse.unauthorized.statusCode)
        .json(
          createResponse(false, customResourceResponse.unauthorized.message)
        );
    } catch (error) {
      console.log("[-] Error Occured in Verify Middleware");
      return res
        .status(customResourceResponse.serverError.statusCode)
        .json(
          createResponse(false, customResourceResponse.serverError.message)
        );
    }
  }

  async Login(req: Request, res: Response): Promise<ResponseType | any> {
    try {
      if (!req.body.username || !req.body.password) {
        return res
          .status(customResourceResponse.reqValidationError.statusCode)
          .json(
            createResponse(
              false,
              customResourceResponse.reqValidationError.message
            )
          );
      }
      const response: AxiosResponse<any> = await axios.post(
        this.authUrl + "/login",
        req.body
      );
      const token: string = response.data.data.token;
      if (!token) {
        throw new Error("Token not found");
      }
      CookieUtils.setCookie(res, token);
      res
        .status(customResourceResponse.success.statusCode)
        .json(
          createResponse(
            true,
            customResourceResponse.success.message,
            response.data.data
          )
        );
    } catch (error) {
      console.log("[-] Error occured in login controller", error);
      return res
        .status(customResourceResponse.serverError.statusCode)
        .json(
          createResponse(false, customResourceResponse.serverError.message)
        );
    }
  }
  async Signup(req: Request, res: Response): Promise<any> {
    try {
      const { username, password, email } = req.body;
      if (!username || !password || !email) {
        return res
          .status(customResourceResponse.fieldsEmpty.statusCode)
          .json(
            createResponse(false, customResourceResponse.fieldsEmpty.message)
          );
      }
      const response: AxiosResponse<any> = await axios.post(
        this.authUrl + "/signup",
        req.body
      );
      const token: string = response.data.data.token;
      if (!token) {
        throw new Error("Token not found");
      }
      CookieUtils.setCookie(res, token);
      res
        .status(customResourceResponse.success.statusCode)
        .json(
          createResponse(
            true,
            customResourceResponse.success.message,
            response.data.data
          )
        );
    } catch (error) {
      console.log("[-] Error occured in signup controller", error);
      return res
        .status(customResourceResponse.serverError.statusCode)
        .json(
          createResponse(false, customResourceResponse.serverError.message)
        );
    }
  }
  async Logout(req: Request, res: Response): Promise<any> {
    try {
      CookieUtils.clearCookie(res);
      res
        .status(customResourceResponse.success.statusCode)
        .json(createResponse(true, customResourceResponse.success.message));
    } catch (error) {
      console.log("[-] Error occured in logout controller", error);
      return res
        .status(customResourceResponse.serverError.statusCode)
        .json(
          createResponse(false, customResourceResponse.serverError.message)
        );
    }
  }
}
