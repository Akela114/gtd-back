import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class InboxMessagesRepository {
	constructor(private prismaService: PrismaService) {}
	getInboxMessages() {
		return this.prismaService.inboxMessage.findMany();
	}
	updateInboxMessage(
		id: string,
		data: {
			message: Prisma.InboxMessageUpdateInput["message"];
		},
	) {
		return this.prismaService.inboxMessage.update({
			where: {
				id,
			},
			data,
		});
	}
}
