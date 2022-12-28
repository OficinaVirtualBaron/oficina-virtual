import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";
import { Procedure } from "./Procedure";

@Entity({name: "category"})
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Procedure, (procedure) => procedure.categories)
    procedure: Procedure;

}