import { AccessTokenGuard } from "@/auth/guards/access-token.guard";
import { ZodValidationPipe } from "@/common/pipes/zod-validation.pipe";
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Request,
	UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import {
	CreateInboxMessageDto,
	createInboxMessageSchema,
} from "./dto/create-inbox-message.dto";
import {
	UpdateInboxMessageDto,
	updateInboxMessageSchema,
} from "./dto/update-inbox-message.dto";
import { InboxMessageEntity } from "./entities/inbox-message.entity";
import { InboxMessagesService } from "./inbox-messages.service";

@Controller("inbox-messages")
export class InboxMessagesController {
	constructor(private readonly inboxMessagesService: InboxMessagesService) {}

	@Get()
	@UseGuards(AccessTokenGuard)
	@ApiBearerAuth()
	@ApiOkResponse({ type: [InboxMessageEntity] })
	async getInboxMessages(@Request() req: ExpressRequestWithUser) {
		const inboxMessages =
			await this.inboxMessagesService.getInboxMessagesOfUser(req.user.id);
		return inboxMessages.map(
			(inboxMessage) => new InboxMessageEntity(inboxMessage),
		);
	}

	@Post()
	@UseGuards(AccessTokenGuard)
	@ApiBearerAuth()
	@ApiOkResponse({ type: InboxMessageEntity })
	async createInboxMessage(
		@Body(new ZodValidationPipe(createInboxMessageSchema))
		dto: CreateInboxMessageDto,
		@Request() req: ExpressRequestWithUser,
	) {
		const createdInboxMessage =
			await this.inboxMessagesService.createInboxMessage(dto, req.user.id);
		return new InboxMessageEntity(createdInboxMessage);
	}

	@Patch(":id")
	@UseGuards(AccessTokenGuard)
	@ApiBearerAuth()
	@ApiOkResponse({ type: InboxMessageEntity })
	async updateInboxMessage(
		@Param("id") id: string,
		@Body(new ZodValidationPipe(updateInboxMessageSchema))
		dto: UpdateInboxMessageDto,
		@Request() req: ExpressRequestWithUser,
	) {
		const updatedInboxMessage =
			await this.inboxMessagesService.updateInboxMessageOfUser(
				id,
				dto,
				req.user.id,
			);
		return new InboxMessageEntity(updatedInboxMessage);
	}

	@Delete(":id")
	@UseGuards(AccessTokenGuard)
	@ApiBearerAuth()
	@ApiOkResponse({ type: InboxMessageEntity })
	async deleteInboxMessage(
		@Param("id") id: string,
		@Request() req: ExpressRequestWithUser,
	) {
		const deletedInboxMessage =
			await this.inboxMessagesService.deleteInboxMessageOfUser(id, req.user.id);
		return new InboxMessageEntity(deletedInboxMessage);
	}
}
