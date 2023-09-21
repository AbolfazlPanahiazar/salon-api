import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from '../dtos/update-user.dto';
import {
  DeleteResult,
  FindOptionsWhere,
  InsertResult,
  Repository,
} from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async save(user: Partial<UserEntity>): Promise<UserEntity> {
    if (user.email) {
      const userByEmail = await this.userRepository.findOne({
        where: {
          email: user.email,
        },
      });

      if (userByEmail) {
        if (user.id && user.id != userByEmail.id) {
          throw new BadRequestException(
            'Email already exists, please enter a different one.',
            'email',
          );
        }
        if (!user.id) {
          throw new BadRequestException(
            'Email already exists, please enter a different one.',
            'email',
          );
        }
      }
    }
    return this.userRepository.save(user);
  }

  async findManyAndCount(
    limit = 20,
    skip = 0,
    search?: string,
  ): Promise<{ users: UserEntity[]; count: number }> {
    const query = this.userRepository.createQueryBuilder('users');

    if (search) {
      query.andWhere('users.email LIKE :email', { email: `%${search}%` });
    }

    const [users, count] = await query.take(limit).skip(skip).getManyAndCount();

    return { users, count };
  }

  async findOne(find: FindOptionsWhere<UserEntity>): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { ...find },
    });
    if (!user) {
      throw new NotFoundException(`User not found.`);
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ id }, updateUserDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.userRepository.delete({ id });
  }

  findOneByIdForJwt(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  findOneOrNull(
    find: FindOptionsWhere<UserEntity>,
  ): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { ...find } });
  }
}
