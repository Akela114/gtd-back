import { ApiProperty } from "@nestjs/swagger";

export class InboxMessageEntity {
	@ApiProperty({ description: "ID" })
	id: string;

	@ApiProperty({ description: "Сообщение" })
	message: string;

	@ApiProperty({ description: "Дата создания" })
	createdAt: Date;

	@ApiProperty({ description: "Дата последнего обновления" })
	updatedAt: Date;

	constructor(data: InboxMessageEntity) {
		this.id = data.id;
		this.message = data.message;
		this.createdAt = data.createdAt;
		this.updatedAt = data.updatedAt;
	}
}
