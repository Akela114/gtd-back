import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersRepository } from "./users.repository";
import { UsersController } from "./user.controller";
import { PasswordService } from "@/password/password.service";
import { PasswordModule } from "@/password/password.module";

@Module({
	providers: [UsersService, UsersRepository],
	controllers: [UsersController],
	exports: [UsersService],
	imports: [PasswordModule],
})
export class UsersModule {}
