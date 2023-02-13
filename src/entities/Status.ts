import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToMany
} from "typeorm";
import { ProcedureHistory } from "./ProcedureHistory";

@Entity({name: "status"})
export class Status {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: true})
    status: string;

    @OneToMany(() => ProcedureHistory, (procedure) => procedure.status)
    procedure: ProcedureHistory
}