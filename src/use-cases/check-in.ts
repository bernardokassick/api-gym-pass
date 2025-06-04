import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositories/check-in-repository";
import { GymRepository } from "@/repositories/gym-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CheckInUseCaseRequest {
    userId: string;
    gymId: string;
    userLatitude: number;
    userLongitude: number;
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn;
}

export class CheckInUseCase {
    constructor(
        private checkInRepository: CheckInRepository,
        private gymRepository: GymRepository
    ) {}

    async create({
        userId,
        gymId,
    }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const gymFound = await this.gymRepository.findById(gymId);

        if (!gymFound) {
            throw new ResourceNotFoundError();
        }

        const checkInFound =
            await this.checkInRepository.findCheckInByUserOnDate(
                userId,
                new Date()
            );

        if (checkInFound != null) {
            throw new Error("User already checked in.");
        }

        const checkIn = await this.checkInRepository.create({
            gym_id: gymId,
            user_id: userId,
        });
        return { checkIn };
    }
}
