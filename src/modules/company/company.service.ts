import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Company } from './company.entity';
import { CreateCompanyDTO } from './dtos/create-company.dto';
import { EditCompanyDTO } from './dtos/edit-company.dto';
import { SearchFilters } from 'src/utils/filters';
import { getLimitAndOffset } from 'src/utils/pagination';
import { User } from '../user/user.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getMany(filters: SearchFilters) {
    const { limit, offset } = getLimitAndOffset(filters.amount, filters.page);
    const companies = await this.companyRepository.findAndCount({
      where: {
        deletedAt: null,
      },

      skip: offset,
      take: limit,
    });

    return { result: companies[0], total: companies[1] };
  }

  async getOne(id: string) {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: ['users'],
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return company;
  }

  create(payload: CreateCompanyDTO) {
    const { name, document } = payload;
    const company = new Company(name, document);

    return this.companyRepository.save(company);
  }

  async edit(id: string, payload: EditCompanyDTO) {
    const company = await this.companyRepository.findOne({
      where: { id },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    company.edit(payload);

    return this.companyRepository.save(company);
  }

  async delete(id: string) {
    const company = await this.companyRepository.findOne({
      where: { id },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }
    return this.companyRepository.remove(company);
  }

  async addUser(id: string, usersIds: string[]) {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: ['users'],
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const users = await this.userRepository.find({
      where: { id: In(usersIds) },
    });

    if (!users) {
      throw new NotFoundException('No users found.');
    }

    company.addUsers(users);

    await this.companyRepository.save(company);

    return {
      company,
    };
  }

  async removeUser(id: string, userId: string) {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: ['users'],
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('No user found.');
    }

    company.removeUser(user);

    await this.companyRepository.save(company);

    return {
      company,
    };
  }
}
