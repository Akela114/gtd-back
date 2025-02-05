import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenPayload } from "../types/types";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
	Strategy,
	"access-token",
) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_ACCESS_SECRET ?? "",
			ignoreExpiration: false,
		});
	}

	validate(payload: TokenPayload) {
		return { id: payload.id };
	}
}
