import { REGEXES } from "@/common/validation/regexes";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ description: "Имя пользователя" })
	username: string;

	@IsString()
	@IsNotEmpty()
	@IsEmail()
	@ApiProperty({ description: "Почта" })
	email: string;

	@IsString()
	@IsNotEmpty()
	@Matches(REGEXES.password)
	@ApiProperty({ description: "Пароль" })
	password: string;
}
