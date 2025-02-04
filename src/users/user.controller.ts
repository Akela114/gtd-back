import { Body, Controller, Param, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./entities/user.entity";
import { ApiCreatedResponse } from "@nestjs/swagger";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@ApiCreatedResponse({ type: UserEntity })
	async createUser(@Body() dto: CreateUserDto) {
		const createdUser = await this.usersService.createUser(dto);
		return new UserEntity(createdUser);
	}
}
