import { Prisma, CheckIn } from "@prisma/client";
import { CheckInRepository } from "../check-in-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class InMemoryCheckInRepostory implements CheckInRepository {
    public items: CheckIn[] = [];

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkInCreated = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            created_at: new Date(),
            validated_at: data.validated_at
                ? new Date(data.validated_at)
                : null,
        };
        this.items.push(checkInCreated);
        return checkInCreated;
    }

    async findCheckInByUserOnDate(userId: string, date: Date) {
        const startOfDay = dayjs(date).startOf("date").toDate();
        const endOfDay = dayjs(date).endOf("date").toDate();

        return (
            this.items.find(
                (checkIn) =>
                    checkIn.user_id === userId &&
                    checkIn.created_at >= startOfDay &&
                    checkIn.created_at <= endOfDay
            ) || null
        );
    }
}
