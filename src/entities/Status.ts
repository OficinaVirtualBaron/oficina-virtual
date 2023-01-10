import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToOne
} from "typeorm";
import { ProcedureHistory } from "./ProcedureHistory";

@Entity({name: "status"})
export class Status extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    status: string;

    @OneToOne(() => ProcedureHistory, (procedure_history) => procedure_history.status)
    procedure_history: ProcedureHistory
}