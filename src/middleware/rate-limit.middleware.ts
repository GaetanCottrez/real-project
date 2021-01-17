import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import * as rateLimit from 'express-rate-limit';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private static options: any;

  public static configure(options: any) {
    this.options = options;
  }

  public use(req: Request, res: Response, next: NextFunction) {
    if (RateLimitMiddleware.options) {
      rateLimit(RateLimitMiddleware.options)(req, res, next);
    } else {
      rateLimit()(req, res, next);
    }
  }
}
