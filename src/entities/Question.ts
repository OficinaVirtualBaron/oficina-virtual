import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    JoinColumn,
    OneToMany
} from "typeorm";
import { Procedure } from "./Procedure";
import { QuestionHistory } from "./QuestionHistory";
import { QuestionOption } from "./QuestionOption";
import { } from "./QuestionOption";

@Entity({ name: "question" })
export class Question extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany(() => QuestionOption, (question_option) => question_option.question)
    question_options: QuestionOption[]

    @ManyToOne(() => Procedure, (procedure) => procedure.question)
    @JoinColumn({ name: "procedure_id" })
    procedure: Procedure

    @OneToMany(() => QuestionHistory, (questionHistory) => questionHistory.question)
    questionHistory: QuestionHistory[];
}