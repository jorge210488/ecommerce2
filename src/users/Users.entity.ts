import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../orders/Orders.entity"; 
import {v4 as uuid} from "uuid";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 50, nullable: false })
    name: string;

    @Column({ type: "varchar", unique: true, nullable: false, length: 50 })
    email: string;

    @Column({ type: "varchar", length: 100, nullable: false })
    password: string;    
    
    @Column({ type: "int"})
    phone: number;

    @Column({ type: "varchar", length: 100 })
    address: string;    

    @Column({ type: "varchar", length: 50 })
    country?: string;

    @Column({ type: "varchar", length: 50 })
    city?: string;
    
    @Column({ nullable: true})
    isAdmin?: boolean;

    @OneToMany(() => Order, order => order.user)
    orders?: Order[]; 
}