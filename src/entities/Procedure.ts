import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToMany,
    ManyToOne,
    JoinColumn,
    OneToOne
} from "typeorm";
import { Document } from "./Document";
import { Status } from "./Status";
import { Question } from "./Question";
import { Category } from "./Category";
import { User } from "./User";

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
}