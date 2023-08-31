import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { FindOptionsWhere, Repository } from 'typeorm';
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

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
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
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
