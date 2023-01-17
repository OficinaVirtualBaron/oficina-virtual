import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { Question_Option } from "./QuestionOption";

@Entity()
export class Option extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    enabled: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Question_Option, (question_option) => question_option.options)
    @JoinColumn({name: "question_option_id"})
    question_option: Question_Option
}