// src/logger/logging.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { WinstonLoggerService } from './winston-logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: WinstonLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url } = req;

    const now = Date.now();
    return next.handle().pipe(
      tap((response) => {
        const delay = Date.now() - now;
        this.logger.log(
          `${method} ${url} → ${JSON.stringify(response)} +${delay}ms`,
        );
      }),
    );
  }
}
