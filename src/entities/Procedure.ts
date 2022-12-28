import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToMany,
    JoinTable,
    ManyToOne
} from "typeorm";
import { Document } from "./Document";
import { Question } from "./Question";
import { User } from "./User";
import { Category } from "./Category";

@Entity({ name: "procedure" })
export class Procedure extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({length: 30, default: "Procedure title"})
    title: string;

    @Column({default: "SOLICITADO"})
    status: string;

    @OneToMany(() => User, (user) => user.procedures)
    user: User 

    @OneToMany(() => Question, (question) => question.procedures)
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
    question: Question

    @ManyToOne(() => Document, (document) => document.procedure)
    documents: Document[]

    @ManyToOne(() => Category, (category) => category.procedure)
    @JoinTable({
        name: "procedure_has_category",
        joinColumn: {
            name: "category_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "procedure_id",
            referencedColumnName: "id"
        }
    })
    categories: Category[];
}