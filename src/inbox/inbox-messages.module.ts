import { Module } from "@nestjs/common";
import { InboxMessagesService } from "./inbox-messages.service";
import { InboxMessagesController } from "./inbox-messages.controller";
import { InboxMessagesRepository } from "./inbox-messages.repository";

@Module({
	controllers: [InboxMessagesController],
	providers: [InboxMessagesService, InboxMessagesRepository],
})
export class InboxModule {}
