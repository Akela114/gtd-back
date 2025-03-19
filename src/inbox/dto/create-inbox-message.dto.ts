import { inboxMessages } from "@/drizzle/schema/schema";
import { ApiProperty } from "@nestjs/swagger";

import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const createInboxMessageSchema = createInsertSchema(inboxMessages).pick({
	message: true,
});

export type CreateInboxMessage = z.infer<typeof createInboxMessageSchema>;

export class CreateInboxMessageDto implements CreateInboxMessage {
	@ApiProperty({ description: "Сообщение" })
	message: string;
}
