import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateInboxMessageDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ description: "Сообщение" })
	message: string;
}
