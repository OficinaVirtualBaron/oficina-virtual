import {
    Entity,
    Column,
    BaseEntity,
    OneToOne,
    JoinColumn,
    OneToMany,
    PrimaryColumn
} from "typeorm";
import { Maker } from "./Maker";
import { User } from "./User";

@Entity({ name: "customer" })
export class Customer extends BaseEntity {
    @PrimaryColumn()
    cuil: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @OneToOne(() => User,(user) => user.customer)
    @JoinColumn({name: "user_id"})
    user: User

    @OneToMany(() => Maker, (maker) => maker.customer)
    makers: Maker[]
}