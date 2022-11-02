import {
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn,
    BaseEntity
} from "typeorm";

// CREAR TABLA DE TRAMITES Y GENERAR RESPECTIVOS TRAMITES
@Entity() 
export class Tramite extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    descripition: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}