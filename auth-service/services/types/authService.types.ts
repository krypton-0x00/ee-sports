import type { User } from "@prisma/client"

export namespace AuthServiceTypes{
    
    export interface RegisterBody{
        username:string,
        email:string,
        password:string
    }
    export interface LoginBody{
        email:string,
        password:string
    }
    export interface ReturnResponse{
        statusCode:number,
        success:boolean,
        message:string,
        data?:unknown
    }

}
