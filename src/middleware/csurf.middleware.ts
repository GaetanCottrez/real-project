import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import * as csurf from 'csurf';

@Injectable()
export class CsurfMiddleware implements NestMiddleware {
  private static options: CsurfOptions;

  public static configure(options: CsurfOptions) {
    this.options = options;
  }

  public use(req: Request, res: Response, next: NextFunction) {
    const errorHandler = (err: any) => {
      if (err) {
        if (err.code === "EBADCSRFTOKEN")
          throw new BadRequestException("Invalid csrf token");
        throw err;
      }

      next();
    };

    if (req.originalUrl === process.env.IGNORE_CSRF_ROUTE_LOGIN_CALLBACK) {
      next();
    } else if (CsurfMiddleware.options) {
      return csurf(CsurfMiddleware.options)(req, res, errorHandler);
    } else {
      return csurf()(req, res, errorHandler);
    }
  }
}

export interface CsurfOptions {
  value?: (req: Request) => string;
  cookie?: csurf.CookieOptions | boolean;
  ignoreMethods?: string[];
  sessionKey?: string;
}
