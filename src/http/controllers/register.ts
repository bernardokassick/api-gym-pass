import { FastifyRequest, FastifyReply } from "fastify";
import { RegisterUseCase } from "@/use-cases/register-use-case";
import { z } from "zod";
import { PrismaUsersRepostory } from "@/repositories/prisma/prisma-users-repository";

export async function register(req: FastifyRequest, res: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { name, email, password } = registerBodySchema.parse(req.body);
    const prismaUsersRepostory = new PrismaUsersRepostory();
    const registerUseCase = new RegisterUseCase(prismaUsersRepostory);

    try {
        await registerUseCase.createUser({ name, email, password });
    } catch (err) {
        return res.status(409).send("email already exists");
    }

    return res.status(201).send();
}
