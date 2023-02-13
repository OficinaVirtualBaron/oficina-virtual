import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    OneToOne,
    JoinColumn,
    ManyToOne,
    OneToMany
} from "typeorm"
import { Category } from "./Category";
import { ProcedureHistory } from "./ProcedureHistory";

@Entity()
export class UserMuni {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    password: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true, length: 20 })
    cuil: string;

    @Column({ default: "MUNI_ROLE" })
    role: string;

    @Column()
    required: number;

    @Column()
    inprocess: number;

    @Column()
    finalized: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    @ManyToOne(() => Category, (category) => category.muni)
    @JoinColumn({ name: "categoryId" })
    category: Category;

    @OneToMany(() => ProcedureHistory, (procedureHistory) => procedureHistory.userMuni)
    procedureHistory: ProcedureHistory[];
}