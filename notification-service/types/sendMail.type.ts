export interface SendMail {
    to: string
    subject: string
    template: string
}
export interface SendOTPMailServiceType {
    to: string,
    name: string
    otp: number
    userId: string
}
