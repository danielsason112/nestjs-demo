import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryColumn()
    email: string;

    @Column()
    password: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({ nullable: true })
    avatar?: string;
}