import { Body, Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse } from "@nestjs/swagger";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import { SignInEntity } from "./entities/sign-in.entity";
import { SignOutEntity } from "./entities/sign-out.entity";
import { RefreshTokenGuard } from "./guards/refresh-token.guard";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("sign-in")
	@ApiCreatedResponse({ type: SignInEntity })
	async signIn(
		@Body() dto: SignInDto,
		@Res({ passthrough: true }) res: Response,
	) {
		const data = await this.authService.signIn(dto);

		res.cookie("refreshToken", data.refreshToken, {
			httpOnly: true,
		});

		return new SignInEntity(data);
	}

	@Post("refresh")
	@UseGuards(RefreshTokenGuard)
	@ApiBearerAuth()
	@ApiCreatedResponse({ type: SignInEntity })
	async refresh(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	) {
		const data = await this.authService.refresh(req.user);

		res.cookie("refreshToken", data.refreshToken, {
			httpOnly: true,
		});

		return new SignInEntity(data);
	}

	@Post("sign-out")
	@UseGuards(RefreshTokenGuard)
	@ApiBearerAuth()
	@ApiCreatedResponse({ type: SignOutEntity })
	async signOut(@Res({ passthrough: true }) res: Response) {
		res.clearCookie("refreshToken");

		return new SignOutEntity({ isSignedOut: true });
	}
}
