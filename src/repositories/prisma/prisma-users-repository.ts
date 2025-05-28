import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UserRepository } from "../user-repository";

export class PrismaUsersRepostory implements UserRepository {
    async create(data: Prisma.UserCreateInput) {
        const userCreated = await prisma.user.create({
            data,
        });
        return userCreated;
    }

    async findByEmail(email: string) {
        const userFound = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        return userFound;
    }

    async findById(id: string) {
        const userFound = await prisma.user.findUnique({
            where: {
                id,
            },
        });
        return userFound;
    }
}
