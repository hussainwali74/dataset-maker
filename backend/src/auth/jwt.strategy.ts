import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
// import {  } from "passport";
import { Strategy, ExtractJwt, VerifiedCallback } from "passport-jwt";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(payload: any, done: VerifiedCallback) {

        console.log("payload :>>", payload)
        console.log('================================================')

        const user = await this.authService.validateUser(payload)

        if (!user) {
            return done(
                new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED),
                false
            )
        }
        delete user.password;
        return user
        return done(null, user, payload.iat)
    }

}