import {
    Entity,
    Column,
    BaseEntity,
    JoinColumn,
    OneToMany,
    PrimaryColumn
} from "typeorm";
import { Tramite } from "./Tramite";

@Entity({name: "category"})
export class Category extends BaseEntity {
    @PrimaryColumn()
    categoryName: string;

    @OneToMany(() => Tramite, (tramite) => tramite.category)
    tramites: Tramite[]
}