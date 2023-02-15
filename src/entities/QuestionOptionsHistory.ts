import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    JoinColumn,
    ManyToOne
} from "typeorm";
import { QuestionHistory } from "./QuestionHistory";
import { QuestionOption } from "./QuestionOption";

@Entity({ name: "question_option_history" })
export class QuestionOptionHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    answer: string;

    @ManyToOne(() => QuestionHistory, (question) => question.question_option_history)
    @JoinColumn({ name: "question_history_id" })
    question: QuestionHistory

    @ManyToOne(() => QuestionOption, (questionOption) => questionOption.questionOptionHistory)
    @JoinColumn({ name: "question_option_id" })
    questionOption: QuestionOption[];
}