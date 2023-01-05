import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    JoinColumn,
    ManyToOne
} from "typeorm";
import { Question } from "./Question";

@Entity({name: "question_option"})
export class Question_Option extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({nullable: true})
    enabled: boolean;

    @ManyToOne(() => Question, (question) => question.question_options)
    @JoinColumn({name: "question_option_id"})
    question: Question
}