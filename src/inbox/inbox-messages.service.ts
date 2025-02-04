import { Injectable, NotFoundException } from "@nestjs/common";
import { InboxMessagesRepository } from "./inbox-messages.repository";
import { UpdateInboxMessageDto } from "./dto/update-inbox-message.dto";

@Injectable()
export class InboxMessagesService {
	constructor(private inboxMessagesRepository: InboxMessagesRepository) {}

	getInboxMessages() {
		return this.inboxMessagesRepository.getInboxMessages();
	}

	updateInboxMessage(id: string, data: UpdateInboxMessageDto) {
		const isInboxMessageExists = this.checkIfInboxMessageExists(id);

		if (!isInboxMessageExists) {
			throw new NotFoundException("Сообщение не найдено");
		}

		return this.inboxMessagesRepository.updateInboxMessage(id, data);
	}

	private async checkIfInboxMessageExists(id: string) {
		const inboxMessage =
			await this.inboxMessagesRepository.getInboxMessageById(id);

		return Boolean(inboxMessage);
	}
}
