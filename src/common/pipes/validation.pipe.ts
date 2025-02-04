import {
	BadRequestException,
	HttpStatus,
	ValidationPipe,
} from "@nestjs/common";
import { formatValidationError } from "../validation/format-validation-error";

export class CustomValidationPipe extends ValidationPipe {
	constructor() {
		super({
			exceptionFactory: (errors) =>
				new BadRequestException({
					statusCode: HttpStatus.BAD_REQUEST,
					error: "Bad Request",
					messages: Object.fromEntries(errors.map(formatValidationError)),
				}),
		});
	}
}
