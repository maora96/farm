import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Or, Repository } from 'typeorm';
import { SearchFilters } from 'src/utils/filters';
import { getLimitAndOffset } from 'src/utils/pagination';
import { Order } from './order.entity';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { EditOrderDTO } from './dtos/edit-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async getMany(filters: SearchFilters) {
    const { limit, offset } = getLimitAndOffset(filters.amount, filters.page);
    const orders = await this.orderRepository.findAndCount({
      where: {
        deletedAt: null,
      },

      skip: offset,
      take: limit,
    });

    return { result: orders[0], total: orders[1] };
  }

  async getOne(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  create(payload: CreateOrderDTO) {
    const { name, phone } = payload;
    const order = new Order(name, phone);

    return this.orderRepository.save(order);
  }

  async edit(id: string, payload: EditOrderDTO) {
    const order = await this.orderRepository.findOne({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    order.edit(payload);

    return this.orderRepository.save(order);
  }

  async delete(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return this.orderRepository.remove(order);
  }
}
