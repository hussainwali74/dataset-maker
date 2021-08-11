import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class SharedService {

    handleSuccess(data) {
        return {
            status: true,
            data,
        }
    }

    handleError(error, status?: number) {
        return {
            status: false,
            error: error,
        }
    }

}
