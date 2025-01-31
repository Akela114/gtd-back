import { Body, Controller, Get, Param, Patch } from "@nestjs/common";
import { InboxMessagesService } from "./inbox-messages.service";
import { ApiOkResponse } from "@nestjs/swagger";
import { InboxMessageEntity } from "./entities/inbox-message.entity";
import { UpdateInboxMessageDto } from "./dto/update-inbox-message.dto";
@Controller("inbox-messages")
export class InboxMessagesController {
	constructor(private readonly inboxMessagesService: InboxMessagesService) {}

	@Get()
	@ApiOkResponse({ type: [InboxMessageEntity] })
	async getInboxMessages() {
		const inboxMessages = await this.inboxMessagesService.getInboxMessages();
		return inboxMessages.map(
			(inboxMessage) => new InboxMessageEntity(inboxMessage),
		);
	}

	@Patch(":id")
	async updateInboxMessage(
		@Param("id") id: string,
		@Body() dto: UpdateInboxMessageDto,
	) {
		const updatedInboxMessage =
			await this.inboxMessagesService.updateInboxMessage(id, dto);
		return new InboxMessageEntity(updatedInboxMessage);
	}
}
