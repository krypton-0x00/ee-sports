
export default function createResponse<T>(statusCode: number, success: boolean, message: string, data?: T) {
    return { statusCode, success, message, data };
}
