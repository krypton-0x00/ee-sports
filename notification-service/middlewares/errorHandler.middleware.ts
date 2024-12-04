import type { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(`[Error]: ${err.message}`);
    const statusCode = 500;
    if (process.env.NODE_ENV === 'production') {
        res.status(statusCode).json({
            success: false,
            message: err.message || 'Internal Server Error',
        });

    } else {
        res.status(statusCode).json({
            success: false,
            message: err.message || 'Internal Server Error',
            stack: err.stack
        });

    }

};
export default errorHandler;
