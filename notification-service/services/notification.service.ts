import sendMail from "../providers/resend.js";
import type NotificationRepo from "../repositories/notification.repo.js";
import otpTemplate from "../templates/otp.template.js";
import type { SendOTPMailServiceType } from "../types/sendMail.type.js";
import logger from "../utils/logger.js";

export default class NotificationService {
    private notificationRepo;
    constructor(notifactionRepo: NotificationRepo) {
        this.notificationRepo = notifactionRepo;

    }
    async sendOTP({ to, otp, name, userId }: SendOTPMailServiceType) {
        try {
            const title: string = "Verification Mail"
            const template = otpTemplate(title, name, otp)
            const notification = await this.notificationRepo.createNotification({ userId, title, body: otp.toString(), channel: 'EMAIL' })
            if (!notification) {
                throw new Error("Failed to save notification to db.")
            }
            const mail = sendMail({ to, subject: "Verification mail", template })
            if (!mail) {
                this.notificationRepo.updateStatus(notification.id, "FAILED");
                throw new Error("Failed to Send a mail");
            }
            this.notificationRepo.updateStatus(notification.id, "SENT")
            return {
                sucess: true,
                message: "Mail Sent"
            }

        } catch (error) {
            logger.error(`Error Sending Otp to  ${to}: Error: ${error}`)
            throw error;
        }
    }

}
