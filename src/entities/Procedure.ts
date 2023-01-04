import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    JoinTable,
    ManyToOne,
    ManyToMany,
    JoinColumn,
    OneToMany
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

    @Column({nullable: true})
    user_id: number;

    @Column({default: "SOLICITADO"})
    status: string;

    @ManyToOne(() => User, (user) => user.procedures)
    @JoinColumn({name: "user_id"})
    user: User 

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

    @OneToMany(() => Document, (document) => document.procedure)
    @JoinColumn({name: "document_id"})
    documents: Document[]

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
}