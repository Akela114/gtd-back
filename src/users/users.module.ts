import { Module } from "@nestjs/common";
import { UserPasswordService } from "./user-password.service";
import { UsersController } from "./user.controller";
import { UsersRepository } from "./users.repository";
import { UsersService } from "./users.service";

@Module({
	providers: [UsersService, UsersRepository, UserPasswordService],
	controllers: [UsersController],
	exports: [UsersService, UserPasswordService],
})
export class UsersModule {}
