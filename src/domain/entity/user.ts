// src/domain/entities/user.ts
import { randomUUID } from "crypto";

export interface UserProps {
    name: string;
    email: string;
    passwordHash: string;
    createdAt?: Date;
}

export class User {
    private _id: string;
    private props: UserProps;

    constructor(props: UserProps, id?: string) {
        this._id = id ?? randomUUID();
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date(),
        };
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this.props.name;
    }

    set name(name: string) {
        this.props.name = name;
    }

    get email(): string {
        return this.props.email;
    }

    get passwordHash(): string {
        return this.props.passwordHash;
    }

    get createdAt(): Date {
        return this.props.createdAt!;
    }
}
