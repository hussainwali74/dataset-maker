import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';

export const GetUser = createParamDecorator(
    (data: any, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    }
);
