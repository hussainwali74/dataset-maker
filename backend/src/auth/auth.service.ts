import { HttpException, Injectable } from '@nestjs/common';

import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(private userService: UserService) {

    }

    async signPayload(payload: any) {
        return sign(payload, 'secretKey', { expiresIn: '12h' })
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
