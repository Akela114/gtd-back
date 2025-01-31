import { ValidationError } from "@nestjs/common";
import { CONSTRAINT_MESSAGES } from "./constraint-messages";

export const formatValidationError = (
	error: ValidationError,
): [string, string[]] => {
	const constraints = error.constraints || {};

	const messages = Object.entries(constraints).map(([constraint, message]) => {
		const formatter = CONSTRAINT_MESSAGES[constraint];
		return formatter ? formatter(error.property) : message;
	});

	return [error.property, messages];
};
