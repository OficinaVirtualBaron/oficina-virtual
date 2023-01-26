import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToMany
} from "typeorm";
import { CategoryHasMuni } from "./CategoryHasMuni";
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

    @ManyToMany(() => UserMuni, (munis) => munis.category)
    munis: UserMuni[];

    @OneToMany(() => CategoryHasMuni, (category_has_muni) => category_has_muni.muni)
    category_has_muni: CategoryHasMuni[];
}