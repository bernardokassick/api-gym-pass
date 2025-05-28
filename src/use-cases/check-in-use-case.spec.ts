import { expect, beforeEach, describe, it } from "vitest";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { InMemoryCheckInRepostory } from "@/repositories/in-memory/in-memory-check-in-repository";
import { CheckInUseCase } from "./check-in-use-case";

let checkInRepository: InMemoryCheckInRepostory;
let checkInUseCase: CheckInUseCase;

describe("Get check in use case", () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepostory();
        checkInUseCase = new CheckInUseCase(checkInRepository);
    });

    it("should be able to check-in", async () => {
        const createdCheckIn = await checkInRepository.create({
            user_id: "user-123",
            gym_id: "gym-123",
        });

        await expect(createdCheckIn.id).toEqual(expect.any(String));
    });

    // it("shouldn't be able to get user profile with wrong id", async () => {
    //     await expect(() =>
    //         checkInUseCase.getProfile({
    //             userId: "12345",
    //         })
    //     ).rejects.toBeInstanceOf(ResourceNotFoundError);
    // });
}); //describe
