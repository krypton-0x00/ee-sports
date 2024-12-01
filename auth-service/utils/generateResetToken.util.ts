import crypto from "crypto";

export default function generateResetToken(): string {
    return crypto.randomBytes(20).toString("hex");
}
