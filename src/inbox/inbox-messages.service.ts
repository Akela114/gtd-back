import {
	Injectable,
	NotFoundException,
	UnprocessableEntityException,
} from "@nestjs/common";
import { CreateInboxMessageDto } from "./dto/create-inbox-message.dto";
import { UpdateInboxMessageDto } from "./dto/update-inbox-message.dto";
import { InboxMessagesRepository } from "./inbox-messages.repository";

@Injectable()
export class InboxMessagesService {
	constructor(private inboxMessagesRepository: InboxMessagesRepository) {}

	getInboxMessagesOfUser(userId: string) {
		return this.inboxMessagesRepository.getInboxMessagesOfUser(userId);
	}

	async createInboxMessage(dto: CreateInboxMessageDto, userId: string) {
		const createdInboxMessage =
			await this.inboxMessagesRepository.createInboxMessage({
				...dto,
				userId,
			});

		if (!createdInboxMessage) {
			throw new UnprocessableEntityException("Inbox message not created");
		}

		return createdInboxMessage;
	}

	async updateInboxMessageOfUser(
		id: string,
		dto: UpdateInboxMessageDto,
		userId: string,
	) {
		const updatedInboxMessage =
			await this.inboxMessagesRepository.updateInboxMessageOfUser(
				id,
				dto,
				userId,
			);

		if (!updatedInboxMessage) {
			throw new NotFoundException("Inbox message not found");
		}

		return updatedInboxMessage;
	}

	async deleteInboxMessageOfUser(id: string, userId: string) {
		const deletedInboxMessage =
			await this.inboxMessagesRepository.deleteInboxMessageOfUser(id, userId);

		if (!deletedInboxMessage) {
			throw new NotFoundException("Inbox message not found");
		}

		return deletedInboxMessage;
	}
}
