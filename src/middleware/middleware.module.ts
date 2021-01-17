import { BadRequestException, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HelmetMiddleware } from './helmet.middleware';
import { CorsMiddleware } from './cors.middleware';
import { SessionMiddleware } from './session.middleware';
import { CsurfMiddleware } from './csurf.middleware';
import { RateLimitMiddleware } from './rate-limit.middleware';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: []
})
export class MiddlewareModule implements NestModule {
  constructor() {
  }

  configure(consumer: MiddlewareConsumer) {
    HelmetMiddleware.configure({
      permittedCrossDomainPolicies: {
        permittedPolicies: "none"
      },
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          connectSrc: ["'self'"],
          baseUri: ["'self'"],
          blockAllMixedContent: [],
          fontSrc: ["'self'", "https:", "data:"],
          frameAncestors: ["'self'"],
          imgSrc: ["'self'", "data:"],
          objectSrc: ["'none'"],
          scriptSrc: [
            "'self'",
            "https: 'unsafe-inline'"
          ],
          scriptSrcAttr: ["'none'"],
          styleSrc: ["'self'", "https: 'unsafe-inline'"],
          upgradeInsecureRequests: []
        }
      }
    });

    CorsMiddleware.configure({
      origin: (origin, callback) => {
        if (
          process.env.ACCESS_CONTROL_ALLOW_ORIGIN.split(",").includes(origin) ||
          !origin
        ) {
          callback(null, true);
        } else {
          callback(new BadRequestException("Origin not allowed by CORS"));
        }
      },
      credentials: false
    });

    SessionMiddleware.configure({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      unset: "keep",
      cookie: {
        sameSite: true,
        httpOnly: false,
        secure: true
      }
    });

    CsurfMiddleware.configure({
      ignoreMethods: ["GET", "OPTIONS", "HEAD"]
    });

    RateLimitMiddleware.configure({
      windowMs: process.env.RATE_LIMIT_WINDOWS_MS,
      max: process.env.RATE_LIMIT_MAX
    });

    consumer
      .apply(
        CorsMiddleware,
        HelmetMiddleware,
        SessionMiddleware,
        RateLimitMiddleware
        //CsurfMiddleware,
      )
      .forRoutes("*");
  }
}
