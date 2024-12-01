import type { AuthServiceTypes } from "../services/types/authService.types";

export default function handleError(error: unknown, location: string): AuthServiceTypes.ReturnResponse {
    console.error(`[-] Error Occurred In ${location}:`, error);
    return {
        statusCode: 500,
        success: false,
        message: "Internal Server Error",
    };
}
