import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToMany
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

    @ManyToMany(() => Procedure, (procedure) => procedure.categories)
    procedure: Procedure;

}