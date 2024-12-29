import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { EditUserDTO } from './dtos/edit-user.dto';
import { Order } from '../order/order.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  phone: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @ManyToMany(() => Order)
  @JoinColumn()
  @JoinTable()
  orders: Order[] | null;

  constructor(name: string, phone: string, id?: string) {
    this.id = id ?? uuid();
    this.name = name;
    this.phone = phone;
    this.createdAt = new Date();
  }

  edit(payload: EditUserDTO) {
    this.name = payload.name ?? this.name;
    this.phone = payload.phone ?? this.phone;
    this.updatedAt = new Date();
  }

  delete() {
    this.deletedAt = new Date();
  }

  addOrders(orders: Order[]) {
    if (this.orders.length === 0) {
      this.orders = orders;
    } else {
      const existingOrdersIds = this.orders.map((order: Order) => order.id);
      for (const user of orders) {
        if (!existingOrdersIds.includes(user.id)) {
          this.orders.push(user);
        }
      }
    }
  }
}
