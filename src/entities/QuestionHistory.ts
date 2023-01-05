import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToMany,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { ProcedureHistory } from "./ProcedureHistory";
import { QuestionOptionsHistory } from "./QuestionOptionsHistory";

@Entity({name: "question_history"})
export class QuestionHistory extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany(() => QuestionOptionsHistory, (question_option_history) => question_option_history.question_history)
    question_option_history: QuestionOptionsHistory

    @ManyToOne(() => ProcedureHistory, (procedure_history) => procedure_history.question_history)
    @JoinColumn({name: "procedure_history_id"})
    procedure_history: ProcedureHistory
}