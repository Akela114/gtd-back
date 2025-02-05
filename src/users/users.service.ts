import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserPasswordService } from "./user-password.service";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
	constructor(
		private usersRepository: UsersRepository,
		private userPasswordService: UserPasswordService,
	) {}

	async createUser(dto: CreateUserDto) {
		const isUsernameUnique = await this.checkIfUsernameIsUnique(dto.username);

		if (!isUsernameUnique) {
			throw new BadRequestException(
				"Пользователь с указанным именем уже существует",
			);
		}

		const isEmailUnique = await this.checkIfEmailIsUnique(dto.email);

		if (!isEmailUnique) {
			throw new BadRequestException(
				"Пользователь с указанной почтой уже существует",
			);
		}

		const passwordSalt = this.userPasswordService.createPasswordSalt();
		const passwordHash = await this.userPasswordService.getPasswordHash(
			dto.password,
			passwordSalt,
		);

		return this.usersRepository.createUser({
			username: dto.username,
			email: dto.email,
			passwordHash,
			passwordSalt,
		});
	}

	async getUserById(userId: string) {
		return this.usersRepository.getUserById(userId);
	}

	async getUserByEmail(email: string) {
		return this.usersRepository.getUserByEmail(email);
	}

	private async checkIfUsernameIsUnique(username: string) {
		const user = await this.usersRepository.getUserByUsername(username);

		const isUsernameUnique = !user;
		return isUsernameUnique;
	}

	private async checkIfEmailIsUnique(email: string) {
		const user = await this.usersRepository.getUserByEmail(email);

		const isEmailUnique = !user;
		return isEmailUnique;
	}
}
