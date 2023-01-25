import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    JoinColumn,
    ManyToOne
} from "typeorm";
import { ProcedureHistory } from "./ProcedureHistory";

@Entity({ name: "document" })
export class Document extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    path: string;

    @ManyToOne(() => ProcedureHistory, (procedure) => procedure.documents)
    @JoinColumn({ name: "procedure_history_id" })
    procedure: ProcedureHistory
}