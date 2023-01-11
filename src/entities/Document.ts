import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    JoinColumn,
    ManyToOne
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

    @ManyToOne(() => Procedure, (procedure) => procedure.documents)
    procedure: Procedure
}