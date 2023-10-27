import { Logger, RequestMethod, ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AllExceptionsFilter } from "./modules/ExeptionFilter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api", {
    exclude: [{ path: "/ping", method: RequestMethod.GET }],
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

  app.enableCors();

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("salones ogtic")
    .setDescription("salones ogtic")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("/api/documentation", app, document, {
    swaggerOptions: { persistAuthorization: true, docExpansion: 'none' }
  });

  await app.listen(process.env.PORT);

  Logger.log(
    `The app is running at ${process.env.DOMAIN_NAME}, you can access to the documentation in ${process.env.DOMAIN_NAME}/api/documentation`
  );
}
bootstrap();
