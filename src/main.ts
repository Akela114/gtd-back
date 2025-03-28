import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";

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

	await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
