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
import { Category } from "./Category";
import { MakerTramite } from "./MakersTramites";

@Entity({ name: "tramite" })
export class Tramite extends BaseEntity {
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

    @ManyToOne(() => Category, (category) => category.tramites)
    @JoinColumn({name: "category_id"})
    category: Category

    @OneToMany(() => MakerTramite, (makerTramite) => makerTramite.tramite)
    makerTramite: MakerTramite[]
}