import { UserPasswordService } from "@/users/user-password.service";
import { UsersService } from "@/users/users.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { AuthTokensService } from "./auth-tokens.service";
import { SignInDto } from "./dto/sign-in.dto";
import { TokenPayload } from "./types/types";

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private userPasswordService: UserPasswordService,
		private authTokensService: AuthTokensService,
	) {}

	async signIn(dto: SignInDto) {
		const user = await this.usersService.getUserByEmail(dto.email);

		if (!user) {
			throw new NotFoundException("Пользователь не найден");
		}

		const passwordHash = await this.userPasswordService.getPasswordHash(
			dto.password,
			user.passwordSalt,
		);

		if (passwordHash !== user.passwordHash) {
			throw new NotFoundException("Пользователь не найден");
		}

		const accessToken = this.authTokensService.generateAccessToken({
			id: user.id,
		});

		const refreshToken = this.authTokensService.generateRefreshToken({
			id: user.id,
		});

		return {
			accessToken,
			refreshToken,
		};
	}

	async refresh(payload: TokenPayload) {
		const newAccessToken = this.authTokensService.generateAccessToken({
			id: payload.id,
		});
		const newRefreshToken = this.authTokensService.generateRefreshToken({
			id: payload.id,
		});

		return {
			accessToken: newAccessToken,
			refreshToken: newRefreshToken,
		};
	}
}
