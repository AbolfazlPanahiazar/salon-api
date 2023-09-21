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
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { AdminEndpoint, UserEndpoint } from 'src/core/swagger.decorator';
import { User } from 'src/core/decorators/user.decorator';
import { UserEntity } from '../entities/user.entity';
import { DeleteResult } from 'typeorm';
import {
  ApiConsumes,
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { PaginationDto } from 'src/core/dtos/pagination.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadDto } from '../dtos/upload.dto';

@Controller('user')
@ApiTags(UserController.name)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: 201, type: UserEntity })
  @Post('/create-admin')
  @AdminEndpoint()
  createAdmin(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.save({ ...createUserDto, isAdmin: true });
  }

  @ApiResponse({ status: 200, type: UserEntity, isArray: true })
  @Get('/get-all-users')
  @AdminEndpoint()
  findAll(
    @Query() { limit, search, skip }: PaginationDto,
  ): Promise<{ users: UserEntity[]; count: number }> {
    return this.userService.findManyAndCount(limit, skip, search);
  }

  @ApiResponse({ status: 200, type: UserEntity })
  @Get('/get-user-by-id/:id')
  @AdminEndpoint()
  findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.findOne({ id: +id });
  }

  @Patch('/update-user/:id')
  @AdminEndpoint()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete('/delete-user/:id')
  @AdminEndpoint()
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.remove(+id);
  }

  @Post('/upload-file')
  @UserEndpoint()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('files', 200, {
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
}
