import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { DrizzleModule } from "./drizzle/drizzle.module";
import { InboxModule } from "./inbox/inbox-messages.module";
import { UsersModule } from "./users/users.module";

@Module({
	imports: [
		InboxModule,
		UsersModule,
		AuthModule,
		DrizzleModule,
		ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
