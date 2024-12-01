import type { Request, Response } from "express";



export default class Cookie {
    static maxAge: number = 1000 * 60 * 60; //1 hr

    static setCookie(res: Response, token: string, days: number = 1,) {
        this.maxAge *= days;
        res.cookie("jwt", token, {
            maxAge: this.maxAge,
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV !== "development",
        });
    }


    static removeCookie(res: Response, cookieName = "jwt") {
        res.clearCookie(cookieName, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV !== "development" });
        return res.status(200).json({
            success: true,
            message: "Logout Successful",
        });
    }
}
