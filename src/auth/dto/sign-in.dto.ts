import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ description: "Почта" })
	email: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ description: "Пароль" })
	password: string;
}
