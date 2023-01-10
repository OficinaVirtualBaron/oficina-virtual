import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToMany,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { Question } from "./Question";
import { Category } from "./Category";
import { ProcedureHistory } from "./ProcedureHistory";

@Entity({ name: "procedure" })
export class Procedure extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({length: 30, unique: true})
    title: string;

    @Column()
    category_id: number;

    @Column()
    description: string;

    @OneToMany(() => Question, (question) => question.procedure)
    question: Question[]

    @ManyToOne(() => Category, (category) => category.procedure)
    @JoinColumn({name: "category_id"})
    categories: Category;

    @OneToMany(() => ProcedureHistory, (procedure_history) => procedure_history.procedure)
    procedure_history: ProcedureHistory
}