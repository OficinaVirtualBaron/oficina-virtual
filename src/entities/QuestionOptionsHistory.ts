import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    ManyToMany,
    JoinColumn,
    OneToMany
} from "typeorm";
import { QuestionHistory } from "./QuestionHistory";


@Entity({name: "question_option__history"})
export class QuestionOptionsHistory extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    enable: boolean;

    @ManyToOne(() => QuestionHistory, (question_history) => question_history.question_option_history)
    @JoinColumn({name: "option_historyid"})
    question_history: QuestionHistory
}