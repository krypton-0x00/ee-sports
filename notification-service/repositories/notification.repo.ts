import type { PrismaClient } from "@prisma/client";
import type CreateNotification from "../types/createNotifaction.type.js";

export default class NotificationRepo {
    private prisma;
    constructor(prisma: PrismaClient) {
        this.prisma = prisma
    }
    async createNotification({ userId, title, body, channel }: CreateNotification) {
        return this.prisma.notification.create({
            data: {
                userId,
                title,
                body,
                channel
            }
        })
    }
    async updateStatus(id: string, status: 'FAILED' | 'SENT' | 'PENDING') {
        return this.prisma.notification.update({
            where: {
                id
            },
            data: {
                status
            }

        })
    }
}
