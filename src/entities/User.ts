import { join } from "path";
import {
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn,
    BaseEntity
} from "typeorm";

import Joi from "joi";



@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string

    @Column({
        unique: true    
    })
    cuil: number;

    @Column({
        default: true
    })
    active: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}