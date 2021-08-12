import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    Logger,
} from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();

        try {

            console.log('-----------------------------------------------------')
            console.log("exception :>>", exception)
            console.log('-----------------------------------------------------')

            const status = 500;
            const errorResponse = {
                status: false,
                code: status,
                timeStamp: new Date().toLocaleString(),
                path: request.url,
                method: request.method,
                message: exception?.message['error'] || exception['response']?.message || exception?.message || 'error message not available',
            };

            Logger.error(
                `${request.method} ${request.url}`,
                JSON.stringify(errorResponse),
                'ExceptionFilter',
            );
            if (typeof exception?.getResponse === 'function') {

                if (exception?.getResponse()['error'] !== 'Bad Request') {
                    response.status(status).json(errorResponse);
                }
            } else {
                response.json(errorResponse);
            }
        } catch (error) {
            const errorResponse = {
                status: false,
                code: 500,
                timeStamp: new Date().toLocaleString(),
                path: request.url,
                method: request.method,
                message: "There is an error in request body",
                // error:error.error

            }
            console.log('-----------------------------------------------------')
            console.log("error :>>", error)
            console.log("error :>>", error['errorType'])
            console.log('-----------------------------------------------------')
            response.json(errorResponse)
        }
    }

}
