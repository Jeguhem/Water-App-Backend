import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const request = context.switchToHttp().getRequest();

        if (data?.rows && typeof data?.count === 'number') {
          const page = parseInt(request.query.page) || 1;
          const limit = parseInt(request.query.limit) || 10;
          return {
            status: context.switchToHttp().getResponse().statusCode,
            message: 'success',
            data: {
              results: data.rows,
              pagination: {
                total: data.count,
                page,
                limit,
                totalPages: Math.ceil(data.count / limit),
              },
            },
          };
        }

        return {
          status: context.switchToHttp().getResponse().statusCode,
          message: 'success',
          data: data,
        };
      }),
    );
  }
}
