import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AdminEndpoint,
  SalonOwnerEndpoint,
  UserEndpoint,
} from 'src/core/swagger.decorator';
import { User } from 'src/core/decorators/user.decorator';
import { UserEntity } from '../../user/entities/user.entity';
import { OrderEntity } from '../entities/order.entity';
import { PaginationDto } from 'src/core/dtos/pagination.dto';

@Controller('order')
@ApiTags(OrderController.name)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/place-order')
  @UserEndpoint()
  create(@Body() createOrderDto: CreateOrderDto, @User() user: UserEntity) {
    return this.orderService.createOrder(user.id, {
      ...createOrderDto,
    });
  }

  @Get('/get-all-orders')
  @AdminEndpoint()
  findAll(@Query() { limit, skip }: PaginationDto) {
    return this.orderService.findManyAndCount(limit, skip);
  }

  @Get('/mine/user')
  @UserEndpoint()
  findUserOrders(
    @Query() { limit, skip }: PaginationDto,
    @User() user: UserEntity,
  ) {
    return this.orderService.findManyAndCountAsUser(limit, skip, user.id);
  }

  @Patch('/update-order/:id')
  @UserEndpoint()
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete('/delete-order/:id')
  @AdminEndpoint()
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }

  @Get('/mine/salon/:id')
  @SalonOwnerEndpoint()
  findSalonOrders(
    @Query() { limit, skip }: PaginationDto,
    @Param('id') id: string,
  ) {
    return this.orderService.findManyAndCountAsSalon(limit, skip, +id);
  }

  @Get('/get-order-by-id/:id')
  @AdminEndpoint()
  findOne(@Param('id') id: string) {
    return this.orderService.findOneByIdWithRelations(+id);
  }
}
