import {
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn,
    BaseEntity
} from "typeorm";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    firstname: string;

    @Column({
        unique: true
    })
    email: string;

    @Column({
        unique: true
    })
    cuil: number

    @Column()
    lastname: string;

    @Column({
        default: true
    })
    active: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}