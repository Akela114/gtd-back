import { type PrismaClient } from "@prisma/client";

const INBOX_MESSAGE_MOCKS = [
	{
		id: "mock-1",
		message: "Mock message 1",
	},
];

export const seedInboxMessages = (prisma: PrismaClient) => {
	return INBOX_MESSAGE_MOCKS.map((inboxMessage) =>
		prisma.inboxMessage.upsert({
			where: { id: inboxMessage.id },
			update: {},
			create: inboxMessage,
		}),
	);
};
