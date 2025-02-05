import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy } from "passport-jwt";
import { TokenPayload } from "../types/types";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
	Strategy,
	"refresh-token",
) {
	constructor() {
		super({
			jwtFromRequest: (req: Request) => req?.cookies?.refreshToken ?? null,
			secretOrKey: process.env.JWT_REFRESH_SECRET ?? "",
			ignoreExpiration: false,
		});
	}

	validate(payload: TokenPayload) {
		return { id: payload.id };
	}
}
