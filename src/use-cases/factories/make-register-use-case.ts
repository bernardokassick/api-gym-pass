import { PrismaUsersRepostory } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "../register-use-case";

export function makeRegisterUseCase() {
    const prismaUsersRepostory = new PrismaUsersRepostory();
    const registerUseCase = new RegisterUseCase(prismaUsersRepostory);

    return registerUseCase;
}
