import { Prisma, CheckIn } from "@prisma/client";

export interface CheckInRepository {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
    findCheckInByUserOnDate(
        userId: string,
        date: Date
    ): Promise<CheckIn | null>;
}
