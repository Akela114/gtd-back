import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { InboxMessagesModule } from './inbox-messages/inbox-messages.module';

@Module({
	imports: [PrismaModule, InboxMessagesModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
