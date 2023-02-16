import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";
import { IsNotEmpty, IsOptional } from "class-validator"
import { ProcedureHistory } from "./ProcedureHistory";

export interface IUser extends Document {
    firstname: string;
    lastname: string;
    password: string;
    email: string;
    cuil: number;
    validatePassword(password: string): Promise<boolean>;
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    password: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    cuil: string;

    @Column()
    adress: string;

    @Column({ default: "USER_ROLE" })
    role: string;

    @Column()
    @IsOptional()
    @IsNotEmpty()
    resetToken: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => ProcedureHistory, (procedures) => procedures.user)
    procedures: ProcedureHistory[]
}