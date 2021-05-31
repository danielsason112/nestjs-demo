import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { UserRole } from "./enums/user-role.enum";

@Entity()
export class UserEntity {
    @PrimaryColumn()
    email: string;

    @Column()
    @Exclude({ toPlainOnly: true })
    password: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({ nullable: true })
    avatar?: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.SPECTATOR })
    role: UserRole;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}