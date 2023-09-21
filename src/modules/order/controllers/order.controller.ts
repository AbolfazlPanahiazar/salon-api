import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserEndpoint } from 'src/core/swagger.decorator';
import { User } from 'src/core/decorators/user.decorator';
import { UserEntity } from '../../user/entities/user.entity';

@Controller('order')
@ApiTags(OrderController.name)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('place-order')
  @UserEndpoint()
  create(@Body() createOrderDto: CreateOrderDto, @User() user: UserEntity) {
    return this.orderService.create({ ...createOrderDto, user_id: user.id });
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
