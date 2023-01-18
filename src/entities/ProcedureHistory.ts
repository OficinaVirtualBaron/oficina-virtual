import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToMany,
    ManyToOne,
    JoinColumn,
    OneToOne,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { Category } from "./Category";
import { Document } from "./Document";
import { QuestionHistory } from "./QuestionHistory";
import { Status } from "./Status";
import { User } from "./User";

@Entity({name: "procedure_history"})
export class ProcedureHistory extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne(() => User, (user) => user.procedures)
    @JoinColumn({name: "user_id"})
    user: User;

    @OneToMany(() => Document, (documents) => documents.procedure)
    documents: Document[];

    @OneToOne(() => Status, (status) => status.procedure, {cascade: true})
    @JoinColumn({name: "status_id"})
    status: Status;
    
    @ManyToOne(() => Category, (category) => category.procedure)
    @JoinColumn({name: "category_id"})
    categories: Category;

    @OneToMany(() => QuestionHistory, (questions) => questions.procedure)
    questions: QuestionHistory[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}