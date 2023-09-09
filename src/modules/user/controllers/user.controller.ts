import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AdminEndpoint, UserEndpoint } from 'src/core/swagger.decorator';
import { User } from 'src/core/decorators/user.decorator';
import { UserEntity } from '../entities/user.entity';
import { DeleteResult } from 'typeorm';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/core/dtos/pagination.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadDto } from '../dto/upload.dto';

@Controller('user')
@ApiTags(UserController.name)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @AdminEndpoint()
  findAll(
    @Query() { limit, search, skip }: PaginationDto,
  ): Promise<{ users: UserEntity[]; count: number }> {
    return this.userService.findManyAndCount();
  }

  @Post('/admin')
  @AdminEndpoint()
  createAdmin(@Body() createUserDto: CreateUserDto) {
    return this.userService.create({ ...createUserDto, isAdmin: true });
  }

  @Post('upload')
  @UserEndpoint()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('file', 200, {
      storage: diskStorage({
        destination: './uploads/',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadMultipleFiles(@UploadedFiles() files, @Body() _: UploadDto) {
    const response = [];
    files.forEach((file) => {
      const fileReponse = {
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }

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

  @Patch('/me')
  @UserEndpoint()
  updateMe(@Body() updateUserDto: UpdateUserDto, @User() user: UserEntity) {
    return this.userService.update(+user.id, updateUserDto);
  }

  @Delete(':id')
  @AdminEndpoint()
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.remove(+id);
  }
}
