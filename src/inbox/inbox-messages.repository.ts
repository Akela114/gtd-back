import { DB_CONNECTION_PROVIDER_NAME } from "@/constants";
import { AvailableTableColumns, DBConnection } from "@/drizzle/drizzle.types";
import { inboxMessages } from "@/drizzle/schema/schema";
import { Inject, Injectable } from "@nestjs/common";
import { and, eq } from "drizzle-orm";

@Injectable()
export class InboxMessagesRepository {
	constructor(
		@Inject(DB_CONNECTION_PROVIDER_NAME) private dbConnection: DBConnection,
	) {}

	getInboxMessagesOfUser(userId: string) {
		return this.dbConnection
			.select()
			.from(inboxMessages)
			.where(eq(inboxMessages.userId, userId));
	}

	async getInboxMessageOfUserById(id: string, userId: string) {
		const result = await this.dbConnection
			.select()
			.from(inboxMessages)
			.where(and(eq(inboxMessages.id, id), eq(inboxMessages.userId, userId)));

		return result[0];
	}

	async createInboxMessage(data: AvailableTableColumns<typeof inboxMessages>) {
		const result = await this.dbConnection
			.insert(inboxMessages)
			.values(data)
			.returning();

		return result[0];
	}

	async updateInboxMessageOfUser(
		id: string,
		data: Partial<AvailableTableColumns<typeof inboxMessages>>,
		userId: string,
	) {
		const result = await this.dbConnection
			.update(inboxMessages)
			.set(data)
			.where(and(eq(inboxMessages.id, id), eq(inboxMessages.userId, userId)))
			.returning();

		return result[0];
	}

	async deleteInboxMessageOfUser(id: string, userId: string) {
		const result = await this.dbConnection
			.delete(inboxMessages)
			.where(and(eq(inboxMessages.id, id), eq(inboxMessages.userId, userId)))
			.returning();

		return result[0];
	}
}
