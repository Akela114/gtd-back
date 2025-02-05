import { Body, Controller, Delete, Get, Param, Patch } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { UpdateInboxMessageDto } from "./dto/update-inbox-message.dto";
import { InboxMessageEntity } from "./entities/inbox-message.entity";
import { InboxMessagesService } from "./inbox-messages.service";

@Controller("inbox-messages")
export class InboxMessagesController {
	constructor(private readonly inboxMessagesService: InboxMessagesService) {}

	@Get()
	// @UseGuards(AccessTokenGuard)
	@ApiBearerAuth()
	@ApiOkResponse({ type: [InboxMessageEntity] })
	async getInboxMessages() {
		const inboxMessages = await this.inboxMessagesService.getInboxMessages();
		return inboxMessages.map(
			(inboxMessage) => new InboxMessageEntity(inboxMessage),
		);
	}

	@Patch(":id")
	// @UseGuards(AccessTokenGuard)
	@ApiBearerAuth()
	@ApiOkResponse({ type: InboxMessageEntity })
	async updateInboxMessage(
		@Param("id") id: string,
		@Body() dto: UpdateInboxMessageDto,
	) {
		const updatedInboxMessage =
			await this.inboxMessagesService.updateInboxMessage(id, dto);
		return new InboxMessageEntity(updatedInboxMessage);
	}

	@Delete(":id")
	// @UseGuards(AccessTokenGuard)
	@ApiOkResponse({ type: InboxMessageEntity })
	async deleteInboxMessage(@Param("id") id: string) {
		const deletedInboxMessage =
			await this.inboxMessagesService.deleteInboxMessage(id);
		return new InboxMessageEntity(deletedInboxMessage);
	}
}
