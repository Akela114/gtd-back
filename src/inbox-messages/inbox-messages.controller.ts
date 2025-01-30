import { Controller, Get } from "@nestjs/common";
import { InboxMessagesService } from "./inbox-messages.service";
import { ApiOkResponse } from "@nestjs/swagger";
import { InboxMessageEntity } from "./entities/inbox-message.entity";
@Controller("inbox-messages")
export class InboxMessagesController {
	constructor(private readonly inboxMessagesService: InboxMessagesService) {}

	@Get()
	@ApiOkResponse({ type: [InboxMessageEntity] })
	async findAll() {
		const inboxMessages = await this.inboxMessagesService.getInboxMessages();
		return inboxMessages.map(
			(inboxMessage) => new InboxMessageEntity(inboxMessage),
		);
	}
}
