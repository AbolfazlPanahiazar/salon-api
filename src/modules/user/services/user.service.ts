import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
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
    if (user.username) {
      const userByUsername = await this.userRepository.findOne({
        where: {
          username: user.username,
        },
      });

      if (userByUsername) {
        if (user.id && user.id != userByUsername.id) {
          throw new BadRequestException(
            'Account name already exists, please enter a different one.',
            'username',
          );
        }
        if (!user.id) {
          throw new BadRequestException(
            'Account name already exists, please enter a different one.',
            'username',
          );
        }
      }
    }
    return this.userRepository.save(user);
  }

  create(createUserDto: Partial<UserEntity>): Promise<InsertResult> {
    return this.userRepository.insert(createUserDto);
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

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  findOne(find: FindOptionsWhere<UserEntity>): Promise<UserEntity> {
    return this.userRepository.findOneOrFail({
      where: { ...find },
    });
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ id }, updateUserDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.userRepository.delete({ id });
  }
}
