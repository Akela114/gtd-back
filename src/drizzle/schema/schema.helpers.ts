import { timestamp, uuid } from "drizzle-orm/pg-core";

export const coreTableColumns = {
	id: uuid().primaryKey().defaultRandom(),
	createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
};
