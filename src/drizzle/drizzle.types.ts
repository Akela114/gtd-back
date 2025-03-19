import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { PgTable } from "drizzle-orm/pg-core";
import * as schema from "./schema/schema";

export type DBSchema = typeof schema;
export type DBConnection = NodePgDatabase<DBSchema>;

export type AvailableTableColumns<
	T extends PgTable,
	K extends keyof T = never,
> = Omit<T["$inferInsert"], "id" | "createdAt" | "updatedAt" | K>;
