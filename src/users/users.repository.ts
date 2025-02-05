import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class UsersRepository {
	constructor(private prismaService: PrismaService) {}

	getUserById(id: Prisma.UserWhereUniqueInput["id"]) {
		return this.prismaService.user.findUnique({
			where: {
				id,
			},
			include: {
				refreshTokens: true,
			},
		});
	}

	getUserByUsername(username: Prisma.UserWhereUniqueInput["username"]) {
		return this.prismaService.user.findUnique({
			where: {
				username,
			},
		});
	}

	getUserByEmail(email: Prisma.UserWhereUniqueInput["email"]) {
		return this.prismaService.user.findUnique({
			where: {
				email,
			},
		});
	}

	createUser(data: Omit<Prisma.UserCreateInput, "id">) {
		return this.prismaService.user.create({
			data,
		});
	}

	updateUser(
		id: Prisma.UserWhereUniqueInput["id"],
		data: Omit<Prisma.UserUpdateInput, "id">,
	) {
		return this.prismaService.user.update({
			where: {
				id,
			},
			data,
		});
	}
}
