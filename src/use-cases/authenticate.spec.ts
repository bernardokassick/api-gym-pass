import { expect, beforeEach, describe, it } from "vitest";
import { InMemoryUsersRepostory } from "@/repositories/in-memory/in-memory-user-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let userRepository: InMemoryUsersRepostory;
let authenticateUseCase: AuthenticateUseCase;

describe("Authenticate use case", () => {
    beforeEach(() => {
        userRepository = new InMemoryUsersRepostory();
        authenticateUseCase = new AuthenticateUseCase(userRepository);
    });

    it("should authenticate with valid credentials", async () => {
        await userRepository.create({
            name: "John Doe",
            email: "johndoe@gmail.com",
            password_hash: await hash("123456", 6),
        });

        const { user } = await authenticateUseCase.authenticate({
            email: "johndoe@gmail.com",
            password: "123456",
        });

        expect(user.id).toEqual(expect.any(String));
    });

    it("should not be able to authenticate with wrong email", async () => {
        await expect(
            authenticateUseCase.authenticate({
                email: "johndoe@gmail.com",
                password: "123456",
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it("should not be able to authenticate with wrong password", async () => {
        await userRepository.create({
            name: "John Doe",
            email: "johndoe@gmail.com",
            password_hash: await hash("123456", 6),
        });

        await expect(
            authenticateUseCase.authenticate({
                email: "johndoe@gmail.com",
                password: "654321",
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
}); //describe
