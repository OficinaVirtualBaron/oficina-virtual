import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
    OneToMany
} from "typeorm";
import { User } from "./User";

@Entity({ name: "mi_tramite" })
export class MiTramite extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({length: 30, default: "Título trámite"})
    title: string;
  
    @Column({length: 250, default: "Descripción trámite"})
    description: string;

    @Column()
    questionone: string;

    @Column()
    questiontwo: string;

    @Column()
    questionthree: string;

    @Column()
    questionfour: string;

    @Column()
    price: number;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.mitramite)
    @JoinColumn({name: "user_id"})
    user: User
}