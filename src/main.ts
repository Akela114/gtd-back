import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { CustomValidationPipe } from "./common/pipes/validation.pipe";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new CustomValidationPipe());

	const swaggerConfig = new DocumentBuilder()
		.setTitle("GTD API")
		.setVersion("0.1")
		.build();

	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup("api", app, document);

	await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
