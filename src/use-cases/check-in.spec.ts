import { expect, afterEach, beforeEach, describe, it, vi } from "vitest";
import { InMemoryCheckInRepostory } from "@/repositories/in-memory/in-memory-check-in-repository";
import { CheckInUseCase } from "./check-in";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { Decimal } from "@prisma/client/runtime/library";

let checkInRepository: InMemoryCheckInRepostory;
let gymRepository: InMemoryGymRepository;
let checkInUseCase: CheckInUseCase;

describe("Get check in use case", () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepostory();
        gymRepository = new InMemoryGymRepository();
        checkInUseCase = new CheckInUseCase(checkInRepository, gymRepository);

        gymRepository.items.push({
            id: "gym-123",
            title: "Gym 123",
            description: "",
            phone: "",
            latitude: new Decimal(0),
            longitude: new Decimal(0),
        });

        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("should be able to check-in", async () => {
        vi.setSystemTime(new Date(2025, 0, 1, 8, 0, 0));

        const { checkIn } = await checkInUseCase.create({
            userId: "user-123",
            gymId: "gym-123",
            userLatitude: 0,
            userLongitude: 0,
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });

    it("should be able to check-in in different days", async () => {
        vi.setSystemTime(new Date(2025, 0, 1, 8, 0, 0));
        await checkInUseCase.create({
            userId: "user-123",
            gymId: "gym-123",
            userLatitude: 0,
            userLongitude: 0,
        });

        vi.setSystemTime(new Date(2025, 0, 3, 8, 0, 0));
        const { checkIn } = await checkInUseCase.create({
            userId: "user-123",
            gymId: "gym-123",
            userLatitude: 0,
            userLongitude: 0,
        });
        expect(checkIn.id).toEqual(expect.any(String));
    });

    it("shouldn't be able to check in twice in the same day", async () => {
        vi.setSystemTime(new Date(2025, 0, 1, 8, 0, 0));
        await checkInUseCase.create({
            userId: "user-123",
            gymId: "gym-123",
            userLatitude: 0,
            userLongitude: 0,
        });

        await expect(() =>
            checkInUseCase.create({
                userId: "user-123",
                gymId: "gym-123",
                userLatitude: 0,
                userLongitude: 0,
            })
        ).rejects.toBeInstanceOf(Error);
    });
}); //describe
