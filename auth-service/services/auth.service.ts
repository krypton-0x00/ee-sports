import type { Request } from "express";
import type AuthRepository from "../repo/auth.repo";
import type { AuthServiceTypes } from "./types/authService.types";
import bcrypt from "bcryptjs"

export default class AuthService{
    private authRepo;

    constructor(authRepo:AuthRepository){
        this.authRepo = authRepo;
    }

    async register(req:Request):Promise<AuthServiceTypes.ReturnResponse>{
        try {
            const {email,username,password}:AuthServiceTypes.RegisterBody = req.body ;
            
            if(!email || !username || !password){
                return {
                    statusCode:401,
                    success:false,
                    message:"All Fields Are Required."
                } 
            }
            const doesExist = await this.authRepo.getUserByEmail(email);
            
            if (doesExist){
                return {
                    statusCode:401,
                    success:false,
                    message:"User Already exists"
                }
            }

            const hashedPassword = await bcrypt.hash(password,10);  

            const user = await this.authRepo.addUser({email,username,passwordHash : hashedPassword});


            return {
                    statusCode:201,
                    success:true ,
                    message:"User Created,",
                    data:user
            }  
            
        } catch (error) {
            console.error("[-] Error Occured In AuthService:RegisterFn :",error);
            return {
                    statusCode:500,
                    success:false ,
                    message:"Internal Server Error"
            } 

        }
    }
    async login(req:Request){
        try {
           const {email,password}:AuthServiceTypes.LoginBody = req.body; 
            if(!email || !password){
                return {
                    statusCode:401,
                    success:false ,
                    message:"All Fields Are Required"
                } 
            }
            const user = await this.authRepo.getUserByEmail(email);
            if(!user){
               return {
                    statusCode:401,
                    success:false ,
                    message:"Invalid email or password"
                }  
            }

            const isPasswordValid = await bcrypt.compare(password,user.passwordHash)

            if(!isPasswordValid){
                 return {
                    statusCode:401,
                    success:false ,
                    message:"Invalid email or password"
                } 
            }

           return {
                statusCode:200,
                success:true,
                message:"Logged In Successfully",
                data:user
            } 

        } catch (error) {
            console.error("[-] Error Occured In AuthService:RegisterFn :",error);
            return {
                    statusCode:500,
                    success:false ,
                    message:"Internal Server Error"
            }  

        }
    }
    
}
