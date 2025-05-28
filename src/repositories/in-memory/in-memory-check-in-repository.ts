import { Prisma, CheckIn } from "@prisma/client";
import { CheckInRepository } from "../check-in-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInRepostory implements CheckInRepository {
    public items: CheckIn[] = [];

    async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
        const checkInCreated = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            created_at: new Date(),
            validated_at: data.valideted_at
                ? new Date(data.valideted_at)
                : null,
        };
        this.items.push(checkInCreated);
        return checkInCreated;
    }
}
