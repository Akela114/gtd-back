import { ZodValidationPipe } from "@/common/pipes/zod-validation.pipe";
import { Body, Controller, Post } from "@nestjs/common";
import { ApiCreatedResponse } from "@nestjs/swagger";
import { CreateUserDto, createUserSchema } from "./dto/create-user.dto";
import { UserEntity } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@ApiCreatedResponse({ type: UserEntity })
	async createUser(
		@Body(new ZodValidationPipe(createUserSchema)) dto: CreateUserDto,
	) {
		const createdUser = await this.usersService.createUser(dto);
		return new UserEntity(createdUser);
	}
}
