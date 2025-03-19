import {
	ArgumentMetadata,
	BadRequestException,
	HttpStatus,
	PipeTransform,
} from "@nestjs/common";
import { ZodSchema } from "zod";

export class ZodValidationPipe implements PipeTransform {
	constructor(private schema: ZodSchema) {}

	transform(value: unknown, metadata: ArgumentMetadata) {
		const { error, data: parsedValue, success } = this.schema.safeParse(value);

		if (success) return parsedValue;

		throw new BadRequestException({
			statusCode: HttpStatus.BAD_REQUEST,
			message: "Bad Request",
			errors: error.errors,
		});
	}
}
