import { PrismaClient } from "@prisma/client";
import { seedInboxMessages } from "./inbox-message";

const prisma = new PrismaClient();

async function main() {
	prisma.$transaction(seedInboxMessages(prisma));
}

try {
	main();
} catch (e) {
	console.error(e);
	process.exit(1);
} finally {
	prisma.$disconnect();
}
