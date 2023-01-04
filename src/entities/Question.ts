import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    ManyToMany,
    JoinColumn
} from "typeorm";
import { Procedure } from "./Procedure";
import { Question_Option } from "./Question_Option";

@Entity({name: "question"})
export class Question extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => Question_Option, (question_option) => question_option.question)
    @JoinColumn({name: "question_option_id"})
    question_options: Question_Option[]

    @ManyToMany(() => Procedure, (procedure) => procedure.question)
    procedures: Procedure
}