import type ResponseType from "../types/response.type";

export default function createResponse(success:boolean,message:string,data?:any):ResponseType{

    return {
        success,
        message,
        data,
    }
}
