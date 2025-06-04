import { expect, beforeEach, describe, it } from "vitest";
import { InMemoryUsersRepostory } from "@/repositories/in-memory/in-memory-user-repository";
import { hash } from "bcryptjs";
import { GetUserProfileUseCase } from "./get-user-profille";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let userRepository: InMemoryUsersRepostory;
let getUserProfileUseCase: GetUserProfileUseCase;

describe("Get user profile use case", () => {
    beforeEach(() => {
        userRepository = new InMemoryUsersRepostory();
        getUserProfileUseCase = new GetUserProfileUseCase(userRepository);
    });

    it("should be able to get user profile", async () => {
        const createdUser = await userRepository.create({
            name: "John Doe",
            email: "johndoe@gmail.com",
            password_hash: await hash("123456", 6),
        });

        const { user } = await getUserProfileUseCase.getProfile({
            userId: createdUser.id,
        });

        await expect(user.id).toEqual(expect.any(String));
        await expect(user.name).toEqual(createdUser.name);
    });

    it("shouldn't be able to get user profile with wrong id", async () => {
        await expect(() =>
            getUserProfileUseCase.getProfile({
                userId: "12345",
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
}); //describe
