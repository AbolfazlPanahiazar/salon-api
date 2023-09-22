import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { OrderEntity } from '../entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  createOrder(
    user_id: number,
    createOrderDto: CreateOrderDto,
  ): Promise<OrderEntity> {
    const order = this.orderRepository.create({ ...createOrderDto, user_id });
    return this.orderRepository.save(order);
  }

  async findManyAndCount(
    limit = 20,
    skip = 0,
  ): Promise<{ orders: OrderEntity[]; count: number }> {
    const query = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.salon', 'salon')
      .leftJoinAndSelect('order.services', 'services')
      .take(limit)
      .skip(skip);

    const [orders, count] = await query.getManyAndCount();

    return { orders, count };
  }

  async findOneByIdWithRelations(id: number): Promise<OrderEntity | undefined> {
    try {
      const order = await this.orderRepository.findOne({
        where: { id },
        relations: ['user', 'services'],
      });
      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }
      return order;
    } catch (error) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
  }

  update(id: number, updateOrderDto: UpdateOrderDto): Promise<OrderEntity> {
    return this.orderRepository.save({ id, ...updateOrderDto });
  }

  remove(id: number): Promise<DeleteResult> {
    return this.orderRepository.delete({ id });
  }

  async findManyAndCountAsUser(
    limit = 20,
    skip = 0,
    user_id: number,
  ): Promise<{ orders: OrderEntity[]; count: number }> {
    const query = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.salon', 'salon')
      .leftJoinAndSelect('order.services', 'services')
      .where('user.id = :user_id', { user_id })
      .take(limit)
      .skip(skip);

    const [orders, count] = await query.getManyAndCount();

    return { orders, count };
  }

  async findManyAndCountAsSalon(
    limit = 20,
    skip = 0,
    salon_id: number,
  ): Promise<{ orders: OrderEntity[]; count: number }> {
    const query = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.salon', 'salon')
      .leftJoinAndSelect('order.services', 'services')
      .where('user.id = :salon_id', { salon_id })
      .take(limit)
      .skip(skip);

    const [orders, count] = await query.getManyAndCount();

    return { orders, count };
  }
}
