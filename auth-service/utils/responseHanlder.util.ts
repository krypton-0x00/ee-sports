
import type { Response } from "express";

export const sendSuccess = (res: Response, statusCode: number, data: any) => {
    res.status(statusCode).json({
        success: true,
        data,
    });
};

export const sendError = (res: Response, statusCode: number, message: string, details?: any) => {
    res.status(statusCode).json({
        success: false,
        message,
        details,
    });
};
