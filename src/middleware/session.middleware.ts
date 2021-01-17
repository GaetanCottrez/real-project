import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import * as ExpressSession from 'express-session';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  private static options: ExpressSession.SessionOptions;

  public static configure(options: ExpressSession.SessionOptions) {
    this.options = options;
  }

  public use(req: Request, res: Response, next: NextFunction) {
    if (SessionMiddleware.options) {
      return ExpressSession(SessionMiddleware.options)(req, res, next);
    } else {
      return ExpressSession()(req, res, next);
    }
  }
}
