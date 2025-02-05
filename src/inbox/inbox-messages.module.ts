import { Module } from "@nestjs/common";
import { InboxMessagesController } from "./inbox-messages.controller";
import { InboxMessagesRepository } from "./inbox-messages.repository";
import { InboxMessagesService } from "./inbox-messages.service";

@Module({
	controllers: [InboxMessagesController],
	providers: [InboxMessagesService, InboxMessagesRepository],
})
export class InboxModule {}
