import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    JoinColumn,
    OneToMany,
    ManyToOne
} from "typeorm";
import { ProcedureHistory } from "./ProcedureHistory";
import { QuestionOptionHistory } from "./QuestionOptionsHistory";
import { Question } from "./Question";

@Entity({ name: "question_history" })
export class QuestionHistory extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => QuestionOptionHistory, (question_option_history) => question_option_history.question)
    question_option_history: QuestionOptionHistory[]

    @ManyToOne(() => ProcedureHistory, (procedure) => procedure.questions)
    @JoinColumn({ name: "procedure_id" })
    procedure: ProcedureHistory

    @ManyToOne(() => Question, (question) => question.questionHistory)
    @JoinColumn({ name: "question_id" })
    question: Question;
}