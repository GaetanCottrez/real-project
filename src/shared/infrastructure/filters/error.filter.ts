import { ArgumentsHost, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { Response } from 'express';
import { DomainError } from '../../domain/domain-error';

export class DomainExceptionFilter implements ExceptionFilter {

  catch(exception: DomainError | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    if (exception instanceof DomainError || exception instanceof HttpException) {
      const status = exception.getStatus ? exception.getStatus() : 500;
      let message: any = exception.getResponse();
      if (typeof message === "object" && message.message) {
        message = message.message;
      }
      Logger.error(
        `${request.method} ${request.url}`,
        JSON.stringify(message),
        "ExceptionFilter"
      );
      return response
        .status(Number(status))
        .json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          message
        });
    }
    Logger.error(
      `${request.method} ${request.url}`,
      exception.stack,
      "ExceptionFilter"
    );
    return response
      .status(500)
      .json({
        statusCode: 500,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.message
      });
  }

}
