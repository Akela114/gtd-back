import { ZodValidationPipe } from "@/common/pipes/zod-validation.pipe";
import { Body, Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse } from "@nestjs/swagger";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { SignInDto, signInSchema } from "./dto/sign-in.dto";
import { SignInEntity } from "./entities/sign-in.entity";
import { SignOutEntity } from "./entities/sign-out.entity";
import { RefreshTokenGuard } from "./guards/refresh-token.guard";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("sign-in")
	@ApiCreatedResponse({ type: SignInEntity })
	async signIn(
		@Body(new ZodValidationPipe(signInSchema)) dto: SignInDto,
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
		@Req() req: ExpressRequestWithUser,
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
