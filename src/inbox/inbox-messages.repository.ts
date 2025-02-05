import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class InboxMessagesRepository {
	constructor(private prismaService: PrismaService) {}

	getInboxMessages() {
		return this.prismaService.inboxMessage.findMany();
	}

	getInboxMessageById(id: Prisma.InboxMessageWhereUniqueInput["id"]) {
		return this.prismaService.inboxMessage.findUnique({
			where: {
				id,
			},
		});
	}

	updateInboxMessage(
		id: Prisma.InboxMessageWhereUniqueInput["id"],
		data: Pick<Prisma.InboxMessageUpdateInput, "message">,
	) {
		return this.prismaService.inboxMessage.update({
			where: {
				id,
			},
			data,
		});
	}

	deleteInboxMessage(id: Prisma.InboxMessageWhereUniqueInput["id"]) {
		return this.prismaService.inboxMessage.delete({
			where: {
				id,
			},
		});
	}
}
