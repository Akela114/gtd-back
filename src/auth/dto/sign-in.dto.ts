import { ApiProperty } from "@nestjs/swagger";
import { z } from "zod";

export const signInSchema = z.object({
	email: z.string(),
	password: z.string(),
});

export type SignIn = z.infer<typeof signInSchema>;

export class SignInDto implements SignIn {
	@ApiProperty({ description: "Почта" })
	email: string;

	@ApiProperty({ description: "Пароль" })
	password: string;
}
