import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { PasswordService } from "@/password/password.service";

@Injectable()
export class UsersService {
	constructor(
		private usersRepository: UsersRepository,
		private passwordService: PasswordService,
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

		const passwordSalt = this.passwordService.createPasswordSalt();
		const passwordHash = await this.passwordService.getPasswordHash(
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

	async getUserById(id: string) {
		return this.usersRepository.getUserById(id);
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
