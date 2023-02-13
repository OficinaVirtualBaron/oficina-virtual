import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToMany,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { Question } from "./Question";
import { Category } from "./Category";

@Entity({ name: "procedure" })
export class Procedure {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 30, unique: true })
    title: string;

    @Column()
    description: string;

    @OneToMany(() => Question, (question) => question.procedure)
    question: Question[];

    @ManyToOne(() => Category, (category) => category.procedureTemplate)
    @JoinColumn({ name: "categoryId" })
    category: Category[];
}