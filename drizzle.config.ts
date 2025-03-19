import "dotenv-expand/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./drizzle",
	schema: "./src/drizzle/schema/schema.ts",
	dialect: "postgresql",
	casing: "snake_case",
	dbCredentials: {
		// biome-ignore lint/style/noNonNullAssertion: always provided
		url: process.env.DB_URL!,
	},
});
