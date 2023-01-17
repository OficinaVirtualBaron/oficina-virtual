import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    JoinColumn,
    OneToMany
} from "typeorm";
import { ProcedureHistory } from "./ProcedureHistory";
import { QuestionOptionHistory } from "./QuestionOptionsHistory";

@Entity({name: "question_history"})
export class QuestionHistory extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany(() => QuestionOptionHistory, (question_option_history) => question_option_history.question)
    question_option_history: QuestionOptionHistory[]

    @ManyToOne(() => ProcedureHistory, (procedure) => procedure.questions)
    @JoinColumn({name: "procedure_id"})
    procedure: ProcedureHistory
}