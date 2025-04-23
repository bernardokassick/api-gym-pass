import { UserRepository } from "@/repositories/user-repository";
import { hash } from "bcryptjs";

interface RegisterUserRequest {
    name: string;
    email: string;
    password: string;
}

export class RegisterUseCase {
    constructor(private userRepostory: UserRepository) {}

    async createUser({ name, email, password }: RegisterUserRequest) {
        const password_hash = await hash(password, 6);

        if ((await this.userRepostory.findByEmail(email)) != null) {
            throw new Error("This email already exists!");
        }

        await this.userRepostory.create({ name, email, password_hash });
    }
}
