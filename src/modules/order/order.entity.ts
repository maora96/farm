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
import { EditOrderDTO } from './dtos/edit-order.dto';

@Entity({ name: 'user' })
export class Order {
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

  // @ManyToMany(() => User)
  // @JoinColumn()
  // @JoinTable()
  // users: User[] | null;

  constructor(name: string, phone: string, id?: string) {
    this.id = id ?? uuid();
    this.name = name;
    this.phone = phone;
    this.createdAt = new Date();
  }

  edit(payload: EditOrderDTO) {
    this.name = payload.name ?? this.name;
    this.phone = payload.phone ?? this.phone;
    this.updatedAt = new Date();
  }

  delete() {
    this.deletedAt = new Date();
  }
}
