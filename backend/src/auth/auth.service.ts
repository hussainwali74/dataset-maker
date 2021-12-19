import { HttpException, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { UserService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwtService: JwtService) {

    }

    async signPayload(payload: any) {
        return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: '10D' })
    }

    async validateUser(payload: any) {
        return await this.userService.findByPayload(payload);
    }

    async hashPassword(password: string) {
        return await bcrypt.hash(password, 10);
    }

    async comparePassword(password: string, encPassword): Promise<Boolean> {

        try {
            return await bcrypt.compare(password, encPassword)
        } catch (error) {
            throw new HttpException(error, error.status)
        }

    }
}
