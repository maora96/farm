import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { SearchFilters } from 'src/utils/filters';
import { getLimitAndOffset } from 'src/utils/pagination';
import { User } from './user.entity';
import { Order } from '../order/order.entity';
import { CreateUserDTO } from './dtos/create-user.dto';
import { EditUserDTO } from './dtos/edit-user.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async getMany(filters: SearchFilters) {
    const { limit, offset } = getLimitAndOffset(filters.amount, filters.page);
    const users = await this.userRepository.findAndCount({
      where: {
        deletedAt: null,
      },

      skip: offset,
      take: limit,
    });

    return { result: users[0], total: users[1] };
  }

  async getOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['orders'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  create(payload: CreateUserDTO) {
    const { name, phone } = payload;
    const user = new User(name, phone);

    return this.userRepository.save(user);
  }

  async edit(id: string, payload: EditUserDTO) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.edit(payload);

    return this.userRepository.save(user);
  }

  async delete(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userRepository.remove(user);
  }

  async addOrder(id: string, ordersIds: string[]) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['orders'],
    });

    if (!user) {
      throw new NotFoundException('Company not found');
    }

    const orders = await this.orderRepository.find({
      where: { id: In(ordersIds) },
    });

    if (!orders) {
      throw new NotFoundException('No orders found.');
    }

    user.addOrders(orders);

    await this.userRepository.save(user);

    return {
      user,
    };
  }
}
