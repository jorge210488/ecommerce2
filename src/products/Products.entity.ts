import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import {v4 as uuid} from "uuid";
import { Category } from "../categories/Categories.entity";
import { OrderDetail } from "../orders/OrderDetails.entity";

@Entity({name: "products"})
export class Product {
  @PrimaryGeneratedColumn("uuid")
    id: string = uuid();

    @Column({type: "varchar", length: 50, nullable: false })
    name: string;

    @Column({type: "varchar", nullable: false })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    @Column({type: "int", nullable: false})
    stock: number;

    @Column({type: "text", nullable: false, default:'https://dogdiscoveries.com/wp-content/uploads/2016/04/samoyed-smiling.png'})
    imgUrl: string;

    @ManyToOne(() => Category, category => category.products, { nullable: false })
    category?: Category; 

    @ManyToMany(() => OrderDetail, orderDetail => orderDetail.products)
    orderDetails?: OrderDetail[];
  }