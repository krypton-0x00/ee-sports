import { Router } from "express";
import NotificationController from "../controllers/notify.controller.js";


export const mailRouter = Router()

mailRouter.post("/", NotificationController.notify)

