import { response, type Request, type Response } from "express";
import { prisma } from "../prisma/prismaClient";
import AuthRepository from "../repo/auth.repo";
import AuthService from "../services/auth.service";


const authRepo = new AuthRepository(prisma);
const authService = new AuthService(authRepo);

export default class AuthController {

    public static async login(req:Request,res:Response){
        try {
            const response = await authService.login(req);
            return res.status(response.statusCode).json({response})
        } catch (error) {
            console.error("[-] Error occured in AuthController:LoginFN",error);
            return res.status(response.statusCode).json(response); 
        }
    }

    public static async register(req:Request,res:Response){
        try {
            const response = await authService.register(req);
            return res.status(response.statusCode).json({response})
        } catch (error) {
            console.error("[-] Error occured in AuthController:RegisterFN",error);
            return res.status(500).json({
                success:false,
                message:"Internal Server Error"
            }); 
        }
    }
    public static async test(req:Request, res:Response){
        res.status(200).json({
            message:"it works"
        })
    }
}

