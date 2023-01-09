import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    JoinTable,
    ManyToMany,
    OneToMany
} from "typeorm";
import { Question } from "./Question";
import { Category } from "./Category";
import { ProcedureHistory } from "./ProcedureHistory";

@Entity({ name: "procedure" })
export class Procedure extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({length: 30, default: "Procedure title"})
    title: string;

    @Column()
    category_id: number;

    @Column()
    description: string;

    @ManyToMany(() => Question, (question) => question.procedures)
    @JoinTable({
        name: "procedure_has_question",
        joinColumn: {
            name: "procedure_idquestion",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "question_idprocedure",
            referencedColumnName: "id"
        }
    })
    question: Question[]

    @ManyToMany(() => Category, (category) => category.procedure)
    @JoinTable({
        name: "procedure_has_category",
        joinColumn: {
            name: "procedure_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "category_id",
            referencedColumnName: "id"
        }
    })
    categories: Category[];

    

    @OneToMany(() => ProcedureHistory, (procedure_history) => procedure_history.procedure)
    procedure_history: ProcedureHistory

}