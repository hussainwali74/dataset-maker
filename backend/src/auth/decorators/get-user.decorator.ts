import { createParamDecorator, ExecutionContext, HttpException, HttpStatus, SetMetadata } from '@nestjs/common';

export const GetUser = createParamDecorator(
    (data: any, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();

        console.log('-----------------------------------------------------')
        console.log("request.user :>>", request.user)
        console.log('-----------------------------------------------------')

        if (!request.user) throw new HttpException("user undefined in token", HttpStatus.UNAUTHORIZED)
        return request.user;
    }
);
