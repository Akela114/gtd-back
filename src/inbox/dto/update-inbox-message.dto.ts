import { inboxMessages } from "@/drizzle/schema/schema";
import { ApiProperty } from "@nestjs/swagger";
import { createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

export const updateInboxMessageSchema = createUpdateSchema(inboxMessages).pick({
	message: true,
});

export type UpdateInboxMessage = z.infer<typeof updateInboxMessageSchema>;

export class UpdateInboxMessageDto implements UpdateInboxMessage {
	@ApiProperty({ description: "Сообщение" })
	message: string;
}
