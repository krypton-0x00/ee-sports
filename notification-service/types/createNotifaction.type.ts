import type { NotificationChannel, Prisma } from "@prisma/client";

export default interface CreateNotification {
    userId: string,
    title: string,
    body: string,
    channel: NotificationChannel
} 
