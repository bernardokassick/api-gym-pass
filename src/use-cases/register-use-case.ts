import { UserRepository } from "@/repositories/user-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { User } from "@prisma/client";

interface RegisterUserRequest {
    name: string;
    email: string;
    password: string;
}

interface RegisterUseCaseResponse {
    userCreated: User;
}

export class RegisterUseCase {
    constructor(private userRepostory: UserRepository) {}

    async createUser({
        name,
        email,
        password,
    }: RegisterUserRequest): Promise<RegisterUseCaseResponse> {
        const password_hash = await hash(password, 6);

        const emailExists = await this.userRepostory.findByEmail(email);
        if (emailExists != null) {
            throw new UserAlreadyExistsError();
        }

        const userCreated = await this.userRepostory.create({
            name,
            email,
            password_hash,
        });

        return { userCreated };
    }
}
