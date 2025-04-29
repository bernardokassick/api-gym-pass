import { expect, test, describe, it } from "vitest";
import { RegisterUseCase } from "./register-use-case";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";
import { InMemoryUsersRepostory } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

describe("Register use case", () => {
    it("should hash user password upon registration", async () => {
        const inMemoryUsersRepostory = new InMemoryUsersRepostory();
        const registerUseCase = new RegisterUseCase(inMemoryUsersRepostory);
        const { userCreated } = await registerUseCase.createUser({
            name: "John Doe",
            email: "johndoe@gmail.com",
            password: "123456",
        });

        const isPasswordHashed = await compare(
            "123456",
            userCreated.password_hash
        );

        expect(isPasswordHashed).toBe(true);
    });

    // TODO:  corrigir esse teste
    it("should not be able to register with same email twice", async () => {
        const inMemoryUsersRepostory = new InMemoryUsersRepostory();
        const registerUseCase = new RegisterUseCase(inMemoryUsersRepostory);
        const email = "johndoe@gmail.com";

        await registerUseCase.createUser({
            name: "John Doe",
            email,
            password: "123456",
        });

        await expect(
            registerUseCase.createUser({
                name: "John Doe",
                email,
                password: "123456",
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });
}); //describe
