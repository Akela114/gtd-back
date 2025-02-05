import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateInboxMessageDto } from "./dto/update-inbox-message.dto";
import { InboxMessagesRepository } from "./inbox-messages.repository";

@Injectable()
export class InboxMessagesService {
	constructor(private inboxMessagesRepository: InboxMessagesRepository) {}

	getInboxMessages() {
		return this.inboxMessagesRepository.getInboxMessages();
	}

	updateInboxMessage(id: string, dto: UpdateInboxMessageDto) {
		const isInboxMessageExists = this.checkIfInboxMessageExists(id);

		if (!isInboxMessageExists) {
			throw new NotFoundException("Сообщение не найдено");
		}

		return this.inboxMessagesRepository.updateInboxMessage(id, dto);
	}

	private async checkIfInboxMessageExists(id: string) {
		const inboxMessage =
			await this.inboxMessagesRepository.getInboxMessageById(id);

		return Boolean(inboxMessage);
	}
}
