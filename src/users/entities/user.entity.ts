import { ApiProperty } from "@nestjs/swagger";

export class UserEntity {
	@ApiProperty({ description: "Сообщение" })
	username: string;

	@ApiProperty({ description: "Почта" })
	email: string;

	constructor(data: UserEntity) {
		this.username = data.username;
		this.email = data.email;
	}
}
