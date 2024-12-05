import { Router } from "express";
import NotificationController from "../controllers/notify.controller.js";
import asyncHandler from "../utils/asyncHandler.util.js";


export const mailRouter = Router()

mailRouter.post("/", asyncHandler(NotificationController.notify))

