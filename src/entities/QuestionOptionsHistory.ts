import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    JoinColumn,
    ManyToOne
} from "typeorm";
import { QuestionHistory } from "./QuestionHistory";

@Entity({name: "question_option_history"})
export class QuestionOptionHistory extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    enabled: boolean;

    @ManyToOne(() => QuestionHistory, (question) => question.question_option_history)
    @JoinColumn({name: "question_history_id"})
    question: QuestionHistory
}