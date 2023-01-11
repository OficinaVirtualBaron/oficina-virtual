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

    @ManyToOne(() => User, (user) => user.procedures)
    user: User

    @OneToMany(() => Question, (question) => question.procedure)
    question: Question[]

    @OneToMany(() => Document, (documents) => documents.procedure)
    documents: Document[]

    @ManyToOne(() => Category, (category) => category.procedure)
    @JoinColumn({name: "category_id"})
    categories: Category;

    @OneToOne(() => Status, (status) => status.procedure)
    @JoinColumn({name: "status_id"})
    status: Status
}