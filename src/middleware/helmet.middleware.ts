import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

import * as helmet from "helmet";

@Injectable()
export class HelmetMiddleware implements NestMiddleware {
  private static options: any;

  public static configure(options: any) {
    this.options = options;
  }

  public use(req: Request, res: Response, next: NextFunction) {
    if (HelmetMiddleware.options) {
      helmet(HelmetMiddleware.options)(req, res, next);
    } else {
      helmet()(req, res, next);
    }
  }
}
