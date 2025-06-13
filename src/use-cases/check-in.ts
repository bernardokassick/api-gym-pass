import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositories/check-in-repository";
import { GymRepository } from "@/repositories/gym-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distante-between-coord";
import { LimitDailyCheckInError } from "./errors/limit-daily-check-in-error";
import { MaxDistanceError } from "./errors/max-distance-error";

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

    MAX_DISTANCE_IN_KILOMETERS = 0.1; // 100 meters

    async execute({
        userId,
        gymId,
        userLatitude,
        userLongitude,
    }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const gymFound = await this.gymRepository.findById(gymId);

        if (!gymFound) {
            throw new ResourceNotFoundError();
        }

        const distance = getDistanceBetweenCoordinates(
            { latitude: userLatitude, longitude: userLongitude },
            {
                latitude: gymFound.latitude.toNumber(),
                longitude: gymFound.longitude.toNumber(),
            }
        );

        if (distance > this.MAX_DISTANCE_IN_KILOMETERS) {
            throw new MaxDistanceError();
        }

        const checkInFound =
            await this.checkInRepository.findCheckInByUserOnDate(
                userId,
                new Date()
            );

        if (checkInFound != null) {
            throw new LimitDailyCheckInError();
        }

        const checkIn = await this.checkInRepository.create({
            gym_id: gymId,
            user_id: userId,
        });
        return { checkIn };
    }
}
