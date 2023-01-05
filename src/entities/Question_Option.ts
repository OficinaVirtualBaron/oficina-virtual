import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToMany
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

    @OneToMany(() => Question, (question) => question.question_options)
    question: Question
}