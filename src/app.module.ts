import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { InboxModule } from "./inbox/inbox-messages.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UsersModule } from "./users/users.module";

@Module({
	imports: [PrismaModule, InboxModule, UsersModule, AuthModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
