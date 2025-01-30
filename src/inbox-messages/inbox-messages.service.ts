import { Injectable } from "@nestjs/common";
import { InboxMessagesRepository } from "./inbox-messages.repository";

@Injectable()
export class InboxMessagesService {
	constructor(private inboxMessagesRepository: InboxMessagesRepository) {}
	getInboxMessages() {
		return this.inboxMessagesRepository.getInboxMessages();
	}
}
