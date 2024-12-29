import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchFilters } from 'src/utils/filters';
import { getLimitAndOffset } from 'src/utils/pagination';
import { Product } from './product.entity';
import { CreateProductDTO } from './dtos/create-product.dto';
import { EditProductDTO } from './dtos/edit-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getMany(filters: SearchFilters) {
    const { limit, offset } = getLimitAndOffset(filters.amount, filters.page);
    const products = await this.productRepository.findAndCount({
      where: {
        deletedAt: null,
      },

      skip: offset,
      take: limit,
    });

    return { result: products[0], total: products[1] };
  }

  async getOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['users'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  create(payload: CreateProductDTO) {
    const { name, phone } = payload;
    const product = new Product(name, phone);

    return this.productRepository.save(product);
  }

  async edit(id: string, payload: EditProductDTO) {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    product.edit(payload);

    return this.productRepository.save(product);
  }

  async delete(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return this.productRepository.remove(product);
  }
}
