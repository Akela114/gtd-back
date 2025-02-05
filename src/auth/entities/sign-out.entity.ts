import { ApiProperty } from "@nestjs/swagger";

export class SignOutEntity {
	@ApiProperty({ description: "Вышел ли пользователь" })
	isSignedOut: boolean;

	constructor(data: SignOutEntity) {
		this.isSignedOut = data.isSignedOut;
	}
}
