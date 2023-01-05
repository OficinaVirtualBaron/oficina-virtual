import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    JoinColumn,
    OneToMany
} from "typeorm";
import { User } from "./User";
import { Document } from "./Document";
import { Procedure } from "./Procedure";
import { QuestionHistory } from "./QuestionHistory";

@Entity({ name: "procedure_history" })
export class ProcedureHistory extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({length: 30, default: "Procedure title"})
    title: string;

    @Column({nullable: true})
    user_id: number;

    @Column({default: "SOLICITADO"})
    status: string;

    @ManyToOne(() => User, (user) => user.procedures_history)
    @JoinColumn({name: "user_id"})
    user: User

    @OneToMany(() => Document, (document) => document.procedure_history)
    @JoinColumn({name: "document_id"})
    documents: Document[]

    @ManyToOne(() => Procedure, (procedure) => procedure.procedure_history)
    @JoinColumn({name: "procedure_id"})
    procedure: Procedure

    @OneToMany(() => QuestionHistory, (question_history) => question_history.procedure_history)
    question_history: QuestionHistory[]
}