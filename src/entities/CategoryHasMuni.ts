import {
    Entity,
    BaseEntity,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { Category } from "./Category";
import { UserMuni } from "./Muni";

@Entity({ name: "category_has_muni" })
export class CategoryHasMuni extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Category, category => category.munis)
    category: Category;

    @ManyToOne(() => UserMuni, muni => muni.category)
    muni: UserMuni;
}