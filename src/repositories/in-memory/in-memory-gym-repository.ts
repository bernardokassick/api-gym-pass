import { Gym, Prisma } from "@prisma/client";
import { GymRepository } from "../gym-repository";

export class InMemoryGymRepository implements GymRepository {
    public items: Gym[] = [];

    async create(data: Prisma.GymCreateInput): Promise<Gym> {
        const gymCreated: Gym = {
            id: data.id ?? crypto.randomUUID(),
            title: data.title,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
        };
        this.items.push(gymCreated);
        return gymCreated;
    }

    async findById(id: string) {
        const gymFound = this.items.find((gym) => gym.id === id);
        if (!gymFound) {
            return null;
        }
        return gymFound;
    }
}
