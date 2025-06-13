import { expect, test, describe, it, beforeEach } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepostory } from "@/repositories/in-memory/in-memory-user-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let userRepository: InMemoryUsersRepostory;
let registerUseCase: RegisterUseCase;

describe("Register use case", () => {
    beforeEach(() => {
        userRepository = new InMemoryUsersRepostory();
        registerUseCase = new RegisterUseCase(userRepository);
    });

    it("should to register", async () => {
        const { userCreated } = await registerUseCase.execute({
            name: "John Doe",
            email: "johndoe@gmail.com",
            password: "123456",
        });

        expect(userCreated.id).toEqual(expect.any(String));
    });

    it("should hash user password upon registration", async () => {
        const { userCreated } = await registerUseCase.execute({
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

    it("should not be able to register with same email twice", async () => {
        const email = "johndoe@gmail.com";

        await registerUseCase.execute({
            name: "John Doe",
            email,
            password: "123456",
        });

        await expect(
            registerUseCase.execute({
                name: "John Doe",
                email,
                password: "123456",
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });
}); //describe
