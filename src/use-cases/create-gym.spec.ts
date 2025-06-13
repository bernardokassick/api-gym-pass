import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateGymUseCase } from "./create-gym";

let gymRepository: InMemoryGymRepository;
let createGymUseCase: CreateGymUseCase;

describe("Get user profile use case", () => {
    beforeEach(() => {
        gymRepository = new InMemoryGymRepository();
        createGymUseCase = new CreateGymUseCase(gymRepository);
    });

    it("should be able to create a gym", async () => {
        const { gymCreated } = await createGymUseCase.execute({
            title: "Gym 533",
            description: "A great gym",
            phone: "123456789",
            latitude: -23.5505,
            longitude: -46.6333,
        });

        await expect(gymCreated.id).toEqual(expect.any(String));
    });
}); //describe
