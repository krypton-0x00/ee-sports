import jwt, { type JwtPayload } from 'jsonwebtoken'


export default class Tokens {
    private static expiry = 1000 * 60 * 60; // 1hr

    static generateToken(data: object) {
        const token = jwt.sign(data, process.env.JWT_SECRET as string, {
            expiresIn: this.expiry.toString(),
        });
        return token;
    }

}
