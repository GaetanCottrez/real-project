import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { join } from 'path';
import * as os from 'os';
import * as fs from 'fs';

const port = process.env.PORT || 3000;

async function bootstrap() {
  let app;
  if (!process.env.NODE_ENV || process.env.NODE_ENV !== "production") {
    const httpsOptions = {
      key: fs.readFileSync(join(__dirname, "..", "src/secrets/localhost.key")),
      cert: fs.readFileSync(join(__dirname, "..", "src/secrets/localhost.crt"))
    };
    app = await NestFactory.create<NestExpressApplication>(AppModule, {
      httpsOptions
    });
  } else {
    app = await NestFactory.create<NestExpressApplication>(AppModule, {});
  }

  // Express
  app.setGlobalPrefix("");
  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setViewEngine("hbs");
  // Swagger
  const options = new DocumentBuilder()
      .setTitle(process.env.TITLE_API)
      .setDescription("")
      .setVersion(process.env.VERSION_API)
      .addBearerAuth()
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("doc", app, document);

  await app.listen(port);
  Logger.log(`Server running on ${os.hostname}:${port}`, 'Bootstrap');
}

bootstrap().then();
