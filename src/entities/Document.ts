import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    JoinColumn,
    ManyToOne
} from "typeorm";
import { ProcedureHistory } from "./ProcedureHistory";

@Entity({name: "document"})
export class Document extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    path: string;

    @ManyToOne(() => ProcedureHistory, (procedure_history) => procedure_history.documents)
    @JoinColumn({name: "procedure_history_id"})
    procedure_history: ProcedureHistory;
}