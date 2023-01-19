import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToMany
} from "typeorm";
import { ProcedureHistory } from "./ProcedureHistory";

@Entity({name: "status"})
export class Status extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: true})
    status: string;

    @OneToMany(() => ProcedureHistory, (procedure) => procedure.status)
    procedure: ProcedureHistory
}