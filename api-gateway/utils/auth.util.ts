import type { Response } from "express";
export default class CookieUtils {
  static maxAge: number;

  static setCookie(res: Response, token: string) {
    res.cookie("token", token, {
      maxAge: CookieUtils.maxAge,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.DEPLOY === "PROD" ? true : false,
    });
  }
  static clearCookie(res: Response) {
    res.clearCookie("token");
  }
}
