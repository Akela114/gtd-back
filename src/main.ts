import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
import { CustomValidationPipe } from "./common/pipes/validation.pipe";
import { PrismaClientExceptionFilter } from "./prisma/filters/prisma-client-exception/prisma-client-exception.filter";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const swaggerConfig = new DocumentBuilder()
		.setTitle("GTD API")
		.setVersion("0.1")
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup("api", app, document);

	app.use(cookieParser());

	app.useGlobalPipes(new CustomValidationPipe());

	const { httpAdapter } = app.get(HttpAdapterHost);

	app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

	await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
