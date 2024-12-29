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
import { EditCompanyDTO } from './dtos/edit-company.dto';
import { User } from '../user/user.entity';

@Entity({ name: 'company' })
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  document: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @ManyToMany(() => User)
  @JoinColumn()
  @JoinTable()
  users: User[] | null;

  constructor(name: string, document: string, id?: string) {
    this.id = id ?? uuid();
    this.name = name;
    this.document = document;
    this.createdAt = new Date();
  }

  edit(payload: EditCompanyDTO) {
    this.name = payload.name ?? this.name;
    this.document = payload.document ?? this.document;
    this.updatedAt = new Date();
  }

  addUsers(users: User[]) {
    if (this.users.length === 0) {
      this.users = users;
    } else {
      const existingUsersIds = this.users.map((user: User) => user.id);
      for (const user of users) {
        if (!existingUsersIds.includes(user.id)) {
          this.users.push(user);
        }
      }
    }
  }

  removeUser(user: User) {
    if (this.users.length !== 0) {
      const newUsers = this.users.filter((usr: User) => usr.id !== user.id);
      this.users = newUsers;
    }
  }

  delete() {
    this.deletedAt = new Date();
  }
}
