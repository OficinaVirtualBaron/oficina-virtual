import bcrypt from "bcrypt";
import { number } from "joi";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
  
export interface IUser extends Document {
    firstname: string;
    lastname: string;
    password: string;
    email: string;
    cuil: number;
    validatePassword(password: string): Promise<boolean>;
}

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    firstname: string;
  
    @Column()
    lastname: string;

    @Column()
    password: string;

    @Column({unique: true})
    email: string;

    @Column({type: "int", width: 200, unique: true})
    cuil: number;
  
    @Column({default: true})
    active: boolean;

    @Column({default: "USER_ROLE", enum: ["USER_ROLE", "MUNI_ROLE", "ADMIN_ROLE"]})
    role: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}