import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToMany,
    ManyToOne
} from "typeorm";
import { Question } from "./Question";
import { Category } from "./Category";

@Entity({ name: "procedure" })
export class Procedure extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({length: 30, unique: true})
    title: string;

    @Column()
    category_id: number;

    @Column()
    description: string;

    @OneToMany(() => Question, (question) => question.procedure)
    question: Question[];

    @ManyToOne(() => Category, (category) => category.procedureTemplate)
    category: Category
}