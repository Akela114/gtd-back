import { ApiProperty } from "@nestjs/swagger";

export class SignInEntity {
	@ApiProperty({ description: "Токен доступа" })
	accessToken: string;

	constructor(data: SignInEntity) {
		this.accessToken = data.accessToken;
	}
}
