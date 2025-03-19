import { DB_CONNECTION_PROVIDER_NAME } from "@/constants";
import { AvailableTableColumns, DBConnection } from "@/drizzle/drizzle.types";
import { users } from "@/drizzle/schema/schema";
import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

@Injectable()
export class UsersRepository {
	constructor(
		@Inject(DB_CONNECTION_PROVIDER_NAME) private dbConnection: DBConnection,
	) {}

	async getUserById(userId: string) {
		const result = await this.dbConnection
			.select()
			.from(users)
			.where(eq(users.id, userId));

		return result[0];
	}

	async getUserByUsername(username: string) {
		const result = await this.dbConnection
			.select()
			.from(users)
			.where(eq(users.username, username));

		return result[0];
	}

	async getUserByEmail(email: string) {
		const result = await this.dbConnection
			.select()
			.from(users)
			.where(eq(users.email, email));

		return result[0];
	}

	async createUser(data: AvailableTableColumns<typeof users>) {
		const user = await this.dbConnection.insert(users).values(data).returning();

		return user[0];
	}

	async updateUser(id: string, data: AvailableTableColumns<typeof users>) {
		const result = await this.dbConnection
			.update(users)
			.set(data)
			.where(eq(users.id, id))
			.returning();

		return result[0];
	}
}
