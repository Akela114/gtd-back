import { DB_CONNECTION_PROVIDER_NAME } from "@/constants";
import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { drizzle } from "drizzle-orm/node-postgres";

@Global()
@Module({
	providers: [
		{
			provide: DB_CONNECTION_PROVIDER_NAME,
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				const connectionString = configService.get<string>("DB_URL");
				// biome-ignore lint/style/noNonNullAssertion: always provided
				return drizzle(connectionString!, {
					casing: "snake_case",
				});
			},
		},
	],
	exports: [DB_CONNECTION_PROVIDER_NAME],
})
export class DrizzleModule {}
