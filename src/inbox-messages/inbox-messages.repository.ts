import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class InboxMessagesRepository {
	constructor(private prismaService: PrismaService) {}
	getInboxMessages() {
		return this.prismaService.inboxMessage.findMany();
	}
}
