import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    JoinColumn,
    ManyToOne,
    OneToMany
} from "typeorm";
import { Question } from "./Question";
import { Option } from "./Option";

@Entity({name: "question_option"})
export class Question_Option extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Question, (question) => question.question_options)
    @JoinColumn({name: "question_id"})
    question: Question

    @OneToMany(() => Option, (options) => options.question_option)
    options: Option[]
}