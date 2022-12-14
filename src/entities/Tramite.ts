import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

@Entity()
export class Tramite extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({length: 30, default: "Título trámite"})
    title: string;
  
    @Column({length: 250, default: "Descripción trámite"})
    description: string;

    @Column({default: "Primer pregunta aquí"})
    firstQuestion: string;

    @Column({default: "Segunda pregunta aquí"})
    secondQuestion: string;

    @Column({default: "Tercera pregunta aquí"})
    thirdQuestion: string;

    @Column({default: "Cuarta pregunta aquí"})
    quarterQuestion: string;

    @Column({default: "Quinta pregunta aquí"})
    fifthQuestion: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}