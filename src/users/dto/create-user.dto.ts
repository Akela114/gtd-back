import { REGEXES } from "@/common/validation/regexes";
import { users } from "@/drizzle/schema/schema";
import { ApiProperty } from "@nestjs/swagger";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const createUserSchema = createInsertSchema(users)
	.pick({
		username: true,
		email: true,
	})
	.extend({
		password: z.string().regex(REGEXES.password),
	});

export type CreateUser = z.infer<typeof createUserSchema>;

export class CreateUserDto implements CreateUser {
	@ApiProperty({ description: "Имя пользователя" })
	username: string;

	@ApiProperty({ description: "Почта" })
	email: string;

	@ApiProperty({ description: "Пароль" })
	password: string;
}
