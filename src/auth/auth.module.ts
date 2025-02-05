import { UsersModule } from "@/users/users.module";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthTokensService } from "./auth-tokens.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AccessTokenStrategy } from "./strategies/access-token.strategy";
import { RefreshTokenStrategy } from "./strategies/refresh-token.strategy";

@Module({
	imports: [JwtModule.register({}), UsersModule],
	controllers: [AuthController],
	providers: [
		AuthService,
		AccessTokenStrategy,
		RefreshTokenStrategy,
		AuthTokensService,
	],
})
export class AuthModule {}
