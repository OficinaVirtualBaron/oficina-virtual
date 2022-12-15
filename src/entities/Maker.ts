import {
    Entity,
    Column,
    BaseEntity,
    ManyToOne,
    OneToMany,
    JoinColumn,
    PrimaryColumn
} from "typeorm";
import { Customer } from "./Customer";
import { MakerTramite } from "./MakersTramites";

@Entity({name: "maker"})
export class Maker extends BaseEntity {
    @PrimaryColumn()
    status: string;

    @Column()
    paymentMethod: string;

    @ManyToOne(() => Customer, (customer) => customer.makers)
    @JoinColumn({name: "customer_id"})
    customer: Customer

    @OneToMany(() => MakerTramite, (makerTramite) => makerTramite.maker)
    makerTramite: MakerTramite[]
}