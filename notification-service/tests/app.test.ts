// tests/app.test.ts
import request from 'supertest';
import prisma from '../prisma/prisma';
import { jest } from '@jest/globals';
import type { Notification, NotificationStatus, NotificationChannel } from '@prisma/client';
import type { Response } from 'supertest';
import { startServer, stopServer } from './server.test';
import http from 'http';

interface NotifyResponse {
    success: boolean;
    message: string;
}

describe('Notification Service Routes', () => {
    let server: http.Server;

    beforeAll(async () => {
        server = await startServer();
    });

    afterAll(async () => {
        await stopServer();
    });

    beforeEach(() => {
        jest.clearAllMocks();
        // Mock Prisma methods
        jest.spyOn(prisma.notification, 'create').mockResolvedValue({} as Notification);
        jest.spyOn(prisma.notification, 'update').mockResolvedValue({} as Notification);
    });

    describe('Health Check', () => {
        it('should return status 200 with body: {success:true}', async () => {
            const response = await request(server).get('/health')
            expect(response.status).toBe(200)
            expect(response.body).toEqual({ success: true })
        })
    })

    describe('Notification Endpoints', () => {
        describe('POST /notify', () => {
            it('should successfully send OTP notification', async () => {
                const payload = {
                    mailType: 'OTP',
                    to: 'krypton0x00@gmail.com',
                    otp: 123456,
                    userId: 'user123',
                    name: 'Test User'
                }

                const response: Response = await request(server)
                    .post('/notify')
                    .send(payload)

                expect(response.status).toBe(200)
                expect(response.body).toEqual<NotifyResponse>({
                    success: true,
                    message: 'Sent'
                })
                expect(prisma.notification.create).toHaveBeenCalled()
                expect(prisma.notification.update).toHaveBeenCalled()
            })

            it('should handle missing required fields', async () => {
                const payload = {
                    mailType: 'OTP',
                }

                const response: Response = await request(server)
                    .post('/notify')
                    .send(payload)

                expect(response.status).toBe(400)
                expect(response.body).toEqual<NotifyResponse>(
                    expect.objectContaining({
                        success: false,
                    })
                )
            })

            it('should handle database errors', async () => {
                jest.spyOn(prisma.notification, 'create').mockRejectedValueOnce(new Error('Database error'));

                const payload = {
                    mailType: 'OTP',
                    to: 'krypton0x00@gmail.com',
                    otp: 123456,
                    userId: 'user123',
                    name: 'Test User'
                }

                const response: Response = await request(server)
                    .post('/notify')
                    .send(payload)

                expect(response.status).toBe(500)
                expect(response.body).toEqual<NotifyResponse>(
                    expect.objectContaining({
                        success: false,
                    })
                )
            })
        })
    })
})