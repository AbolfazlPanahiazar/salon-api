import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AdminEndpoint, UserEndpoint } from 'src/core/swagger.decorator';
import { User } from 'src/core/decorators/user.decorator';
import { UserEntity } from '../entities/user.entity';
import { DeleteResult } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @AdminEndpoint()
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Post('/admin')
  @AdminEndpoint()
  createAdmin(@Body() createUserDto: CreateUserDto) {
    return this.userService.create({ ...createUserDto, isAdmin: true });
  }

  // @Post('/barber')
  // @AdminEndpoint()
  // createBarber(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create({ ...createUserDto, isBarber: true });
  // }

  @Get(':id')
  @AdminEndpoint()
  findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.findOne({ id: +id });
  }

  @Patch(':id')
  @UserEndpoint()
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @User() user: UserEntity,
  ) {
    if (user.id !== +id) {
      throw new UnauthorizedException(`You can only edit your own profile`);
    }
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @AdminEndpoint()
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.remove(+id);
  }
}
