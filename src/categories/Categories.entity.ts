import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../products/Products.entity";


@Entity({name: "categories"})
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({length:50, nullable: false, unique: true })
    name: string;

    @OneToMany(() => Product, product => product.category)
    products: Product[]; 
}

