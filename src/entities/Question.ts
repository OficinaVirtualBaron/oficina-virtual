import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    JoinColumn,
    OneToMany
} from "typeorm";
import { Category } from "./Category";
import { Procedure } from "./Procedure";
import { Question_Option } from "./Question_Option";

@Entity({name: "question"})
export class Question extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany(() => Question_Option, (question_option) => question_option.question)
    question_options: Question_Option[]

    @ManyToOne(() => Procedure, (procedure) => procedure.question)
    @JoinColumn({name: "procedure_id"})
    procedure: Procedure

    @ManyToOne(() => Category, (category) => category.procedure)
    @JoinColumn({name: "category_id"})
    categories: Category;
}