import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinColumn,
    OneToOne
} from "typeorm";
import { Procedure } from "./Procedure";
import { Profile } from "../entities/Profile";

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

    @Column({unique: true})
    cuil: string;

    @Column()
    adress: string;

    @Column({default: "USER_ROLE"})
    role: string;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Procedure, (procedures) => procedures.user)
    procedures: Procedure[]

    @OneToOne(() => Profile)
    @JoinColumn({name: "profile_id"})
    profile: Profile;
}