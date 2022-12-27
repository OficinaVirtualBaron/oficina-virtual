import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne
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
    question_options: Question_Option[]

    
    @ManyToOne(() => Procedure, (procedure) => procedure.question)
    procedures: Procedure[]
}