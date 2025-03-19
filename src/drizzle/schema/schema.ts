import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { coreTableColumns } from "./schema.helpers";

export const users = pgTable("Users", {
	...coreTableColumns,
	username: text().notNull().unique(),
	email: text().notNull().unique(),
	passwordSalt: text().notNull(),
	passwordHash: text().notNull(),
});

export const inboxMessages = pgTable("InboxMessages", {
	...coreTableColumns,
	message: text().notNull(),
	userId: uuid()
		.notNull()
		.references(() => users.id),
});
