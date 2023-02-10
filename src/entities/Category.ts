import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    OneToOne
} from "typeorm";
import { UserMuni } from "./Muni";
import { Procedure } from "./Procedure";
import { ProcedureHistory } from "./ProcedureHistory";

@Entity({ name: "category" })
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    title: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(() => Procedure, (procedure) => procedure.category)
    procedureTemplate: Procedure[]

    @OneToMany(() => ProcedureHistory, (procedure) => procedure.category)
    procedure: ProcedureHistory[];

    @OneToOne(() => UserMuni, (munis) => munis.category)
    munis: UserMuni;
    // hacer esto OneToMany
    @OneToMany(() => UserMuni, (muni) => muni.category)
    muni: UserMuni[];
}