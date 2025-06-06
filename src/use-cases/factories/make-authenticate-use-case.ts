import { PrismaUsersRepostory } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticateUseCase() {
    const prismaUsersRepostory = new PrismaUsersRepostory();
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepostory);

    return authenticateUseCase;
}
