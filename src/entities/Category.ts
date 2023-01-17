import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToMany,
    JoinTable
} from "typeorm";
import { UserMuni } from "./Muni";
import { Procedure } from "./Procedure";
import { ProcedureHistory } from "./ProcedureHistory";

@Entity({name: "category"})
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    title: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(() => ProcedureHistory, (procedure) => procedure.categories)
    procedure: ProcedureHistory[];

    @ManyToMany(() => UserMuni, (munis) => munis.categories)
    @JoinTable({
        name: "category_has_muni",
        joinColumn: {
            name: "category_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "muni_id",
            referencedColumnName: "id"
        }
    })
    munis: UserMuni[]
}