import "dotenv-expand/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";
// @ts-ignore
import * as schema from "../../src/drizzle/schema/schema.js";
import { randomBytes, scrypt } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);

const FAKE_PASS = "qwerty";

const seedDb = async () => {
	try {
		console.log("SEEDING DB...");
		// biome-ignore lint/style/noNonNullAssertion: always provided
		const dbConnection = drizzle(process.env.DB_URL!, {
			casing: "snake_case",
		});

		const userPasswordSalt = randomBytes(16).toString("hex");
		const userPasswordHash = (
			(await scryptAsync(FAKE_PASS, userPasswordSalt, 32)) as Buffer
		).toString("hex");

		await seed(dbConnection, schema).refine((f) => ({
			users: {
				columns: {
					passwordSalt: f.valuesFromArray({
						values: [userPasswordSalt],
					}),
					passwordHash: f.valuesFromArray({
						values: [userPasswordHash],
					}),
				},
				count: 1,
				with: {
					inboxMessages: 1,
				},
			},
		}));

		console.log("DB seeded");
	} catch (e) {
		console.log(e);
	}
};

seedDb();
