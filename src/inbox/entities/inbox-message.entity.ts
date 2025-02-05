import { ApiProperty } from "@nestjs/swagger";
import { InboxMessage } from "@prisma/client";

export class InboxMessageEntity implements InboxMessage {
	@ApiProperty({ description: "ID" })
	id: string;

	@ApiProperty({ description: "Сообщение" })
	message: string;

	@ApiProperty({ description: "Дата создания" })
	createdAt: Date;

	@ApiProperty({ description: "Дата последнего обновления" })
	updatedAt: Date;

	constructor(data: InboxMessage) {
		this.id = data.id;
		this.message = data.message;
		this.createdAt = data.createdAt;
		this.updatedAt = data.updatedAt;
	}
}
