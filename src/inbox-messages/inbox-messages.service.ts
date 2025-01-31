import { Injectable } from "@nestjs/common";
import { InboxMessagesRepository } from "./inbox-messages.repository";
import { UpdateInboxMessageDto } from "./dto/update-inbox-message.dto";

@Injectable()
export class InboxMessagesService {
	constructor(private inboxMessagesRepository: InboxMessagesRepository) {}
	getInboxMessages() {
		return this.inboxMessagesRepository.getInboxMessages();
	}

	updateInboxMessage(id: string, data: UpdateInboxMessageDto) {
		return this.inboxMessagesRepository.updateInboxMessage(id, data);
	}
}
