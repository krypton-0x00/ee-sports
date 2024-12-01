export namespace AuthServiceTypes {


    export interface ReturnResponse {
        statusCode: number,
        success: boolean,
        message: string,
        data?: unknown
    }

}
