import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TokenPayload } from "./types/types";

@Injectable()
export class AuthTokensService {
	constructor(private jwtService: JwtService) {}

	generateAccessToken(payload: TokenPayload) {
		return this.jwtService.sign(payload, {
			secret: process.env.JWT_ACCESS_SECRET,
			expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
		});
	}

	generateRefreshToken(payload: TokenPayload) {
		return this.jwtService.sign(payload, {
			secret: process.env.JWT_REFRESH_SECRET,
			expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
		});
	}
}
