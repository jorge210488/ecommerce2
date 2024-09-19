import { IsNumber } from "class-validator";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Orders.entity";
import { Product } from "../products/Products.entity";


@Entity({name: "orderDetails"})
export class OrderDetail {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    @IsNumber({ maxDecimalPlaces: 2})
    price: number;

    @OneToOne(() => Order, order => order.orderDetail, {nullable: false})
    @JoinColumn({ name: "order_id" })
    order: Order;

    @ManyToMany(() => Product, product => product.orderDetails)
    @JoinTable()
    products: Product[];
}


