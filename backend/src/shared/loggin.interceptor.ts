import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest();
        const method = req.method;
        const url = req.url;

        if (req.body['data']) {
            req.body = JSON.parse(req.body['data'])
        }
        const now = Date.now();
        return next
            .handle()
            .pipe(
                tap(() =>
                    Logger.log(
                        ` ${method} ${url} ${(Date.now() - now) / 1000}s`,
                        context.getClass().name,
                    ),
                ),
            );
    }
}
