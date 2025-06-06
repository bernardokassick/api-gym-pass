import { User, Prisma } from "@prisma/client";
import { UserRepository } from "../user-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepostory implements UserRepository {
    public items: User[] = [];

    async create(data: Prisma.UserCreateInput) {
        const userCreated = {
            id: randomUUID(),
            name: "John Doe",
            email: "johndoe@gmail.com",
            password_hash: data.password_hash,
            created_at: new Date(),
        };
        this.items.push(userCreated);

        return userCreated;
    }

    async findByEmail(email: string) {
        const userFound = this.items.find((item) => item.email === email);
        if (!userFound) {
            return null;
        }
        return userFound;
    }

    async findById(id: string) {
        const userFound = this.items.find((item) => item.id === id);
        if (!userFound) {
            return null;
        }
        return userFound;
    }
}
