import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    JoinColumn,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne
} from "typeorm";
import { User } from "./User";
import { Document } from "./Document";
import { Procedure } from "./Procedure";
import { QuestionHistory } from "./QuestionHistory";
import { Status } from "./Status";

@Entity({ name: "procedure_history" })
export class ProcedureHistory extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    user_id: number;

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

    @OneToOne(() => Status, (status) => status.procedure_history)
    @JoinColumn({name: "status_id"})
    status: Status

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}