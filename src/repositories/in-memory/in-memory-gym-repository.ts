import { Gym, Prisma } from "@prisma/client";
import { GymRepository } from "../gym-repository";

export class InMemoryGymRepository implements GymRepository {
    public items: Gym[] = [];

    async create(data: Prisma.GymCreateInput): Promise<Gym> {
        throw new Error("Method not implemented.");
    }

    async findById(id: string) {
        const gymFound = this.items.find((gym) => gym.id === id);
        if (!gymFound) {
            return null;
        }
        return gymFound;
    }
}
