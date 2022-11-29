import bcrypt from "bcrypt";
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

    @Column()
    email: string;

    @Column({unique: true})
    cuil: number;
  
    @Column({ default: true })
    active: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}