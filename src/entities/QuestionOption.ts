import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    Column
} from "typeorm";
import { Question } from "./Question";
import { QuestionOptionHistory } from "./QuestionOptionsHistory";

@Entity({ name: "question_option" })
export class QuestionOption extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    type: string;

    @Column()
    description: string;

    @ManyToOne(() => Question, (question) => question.question_options)
    @JoinColumn({ name: "question_id" })
    question: Question

    @OneToMany(() => QuestionOptionHistory, (questionOptionHistory) => questionOptionHistory.questionOption)
    questionOptionHistory: QuestionOptionHistory;
}