import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";

export class UserEntity implements Partial<User> {
	@ApiProperty({ description: "Сообщение" })
	username: string;

	@ApiProperty({ description: "Почта" })
	email: string;

	constructor(user: UserEntity) {
		Object.assign(this, user);
	}
}
