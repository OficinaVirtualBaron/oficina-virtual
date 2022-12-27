import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToMany
} from "typeorm";
import { Procedure } from "./Procedure";

@Entity({name: "document"})
export class Document extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    path: string;

    @OneToMany(() => Procedure, (procedure) => procedure.documents)
    procedure: Procedure;
}