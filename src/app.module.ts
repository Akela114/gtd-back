import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { InboxModule } from "./inbox/inbox-messages.module";
import { UsersModule } from "./users/users.module";

@Module({
	imports: [PrismaModule, InboxModule, UsersModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
