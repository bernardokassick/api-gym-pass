import { GymRepository } from "@/repositories/gym-repository";
import { Gym } from "@prisma/client";

interface CreateGymUseCaseRequest {
    title: string;
    description: string | null;
    phone: string | null;
    latitude: number;
    longitude: number;
}

interface CreateGymUseCaseResponse {
    gymCreated: Gym;
}

export class CreateGymUseCase {
    constructor(private gymsRepository: GymRepository) {}

    async execute({
        title,
        description,
        phone,
        latitude,
        longitude,
    }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
        const gymCreated = await this.gymsRepository.create({
            title,
            description,
            phone,
            latitude,
            longitude,
        });

        return { gymCreated };
    }
}
