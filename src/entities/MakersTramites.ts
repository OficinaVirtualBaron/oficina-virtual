import {
    Entity,
    Column,
    BaseEntity,
    JoinColumn,
    OneToMany,
    ManyToOne,
    PrimaryColumn
} from "typeorm";
import { Tramite } from "./Tramite";
import { Maker } from "./Maker";

@Entity({name: "maker_tramite"})
export class MakerTramite extends BaseEntity {
    @PrimaryColumn()
    quantityTramite: string;

    @Column()
    totalPrice: number;

    @ManyToOne(() => Maker, (maker) => maker.makerTramite)
    @JoinColumn({name: "maker_id"})
    maker: Maker

    @ManyToOne(() => Tramite, (tramite) => tramite.makerTramite)
    @JoinColumn({name: "tramite_id"})
    tramite: Tramite
}