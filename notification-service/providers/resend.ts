import { Resend } from "resend";
import dotenv from "dotenv";
import type { SendMail } from "../types/sendMail.type";

dotenv.config();

const resend = new Resend(process.env.RESEND_API);

export default async function sendMail({ to, subject, template }: SendMail) {
    try {
        const { data, error } = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: [to],
            subject: subject,
            html: template,
        });
        if (error) {
            return console.error({ error });
        }

        console.log({ data });
    } catch (error) {
        console.error({ error });
    }
}
