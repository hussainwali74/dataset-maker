import { Body, Controller, Get, HttpException, HttpStatus, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { SharedService } from 'src/shared/shared.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { UserService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService,
        private sharedService: SharedService
    ) { }

    @Get('test')
    test() {
        console.log("newt")
        return "it's working"
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    tempAuth() {

        console.log('-----------------------------------------------------')
        console.log("auth :>>")
        console.log('-----------------------------------------------------')

        return { auth: 'wprld' }
    }

    @Post('login')
    async login(@Body() userDto: LoginDto) {
        // verify user email
        let user;
        try {
            user = await this.userService.findOneByOptions({ where: { email: userDto.email } })
            if (!user) {
                return this.sharedService.handleError('No User with the given credentials', 401)
            }
        } catch (error) {
            return this.sharedService.handleError(error)
        }

        // verify user password
        try {
            const comparePasswordResult = await this.authService.comparePassword(userDto.password, user.password)
            if (!comparePasswordResult) {
                return this.sharedService.handleError('invalid credentials', 401)
            }

        } catch (error) {
            return this.sharedService.handleError(error)
        }

        // generate JWT and return
        const payload = {
            email: user.email,
            user_id: user.id
        }

        try {
            const token = await this.authService.signPayload(payload);
            let { password, ...userfinal } = user;
            return this.sharedService.handleSuccess({ userfinal, token });
        } catch (error) {
            return this.sharedService.handleError(error);
        }
    }

    @Post('register')
    async register(@Body() userEntity: UserEntity) {
        // check if user already registered
        // send error
        const userCheck = await this.userService.findOneByOptions({ where: { email: userEntity.email } })
        if (userCheck) {
            return this.sharedService.handleError(`User already registered with these credentials`)
        }

        try {
            userEntity.password = await this.authService.hashPassword(userEntity.password)
        } catch (error) {
            return this.sharedService.handleError(error)
        }

        //create user with encrypted password
        const user = await this.userService.create(userEntity)

        //sign jwt
        try {
            const payload = {
                email: user.email,
                id: user.id,
                name: user.name
            }

            const token = await this.authService.signPayload(payload)

            return this.sharedService.handleSuccess({ user, token })
        } catch (error) {
            return this.sharedService.handleError(error)
        }
    }
}
