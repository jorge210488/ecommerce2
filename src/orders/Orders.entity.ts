import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/Users.entity"; // Importamos la entidad User
import { OrderDetail } from "./OrderDetails.entity";

@Entity({ name: "orders" })
export class Order {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    date: Date;

    @ManyToOne(() => User, user => user.orders, { nullable: false })
    user: Omit<User, 'password'>; 

    @OneToOne(() => OrderDetail, orderDetail => orderDetail.order, { cascade: true })
    @JoinColumn() 
    orderDetail: OrderDetail;
}
