import type { Request, Response, NextFunction } from "express";
import NotificationService from "../services/notification.service.js";
import NotificationRepo from "../repositories/notification.repo.js";
import prisma from "../prisma/prisma.js";
import type { SendOTPMailServiceType } from "../types/sendMail.type.js";

const notificationRepo = new NotificationRepo(prisma)
const notificationService = new NotificationService(notificationRepo)

interface CustomMailType extends SendOTPMailServiceType {
    mailType: "OTP" | "SUCCESS"
}


export default class NotificationController {
    public static notify(req: Request, res: Response, next: NextFunction) {
        try {
            const { mailType, to, otp, userId, name }: CustomMailType = req.body;

            //TODO:- Add other mail types


            switch (mailType) {
                case "OTP":
                    const emailResponse = notificationService.sendOTP({ to, otp, name, userId })
                    if (!emailResponse) {
                        throw new Error("Email Send Failed.")
                    }
                    res.status(200).json({ sucess: true, message: "Sent" })

                    break;
                default:
                    res.status(400).json({ success: false, message: "Invalid Notification Type" })
            }
        } catch (error) {
            next(error)
        }

    }

}   
