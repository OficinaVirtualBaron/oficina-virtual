import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToOne
} from "typeorm";
import { Procedure } from "./Procedure";

@Entity({name: "status"})
export class Status extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    status: string;

    @OneToOne(() => Procedure, (procedure) => procedure.status)
    procedure: Procedure
}