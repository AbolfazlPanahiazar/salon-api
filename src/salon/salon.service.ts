import { Injectable } from '@nestjs/common';
import { CreateSalonDto } from './dto/create-salon.dto';
import { UpdateSalonDto } from './dto/update-salon.dto';

@Injectable()
export class SalonService {
  create(createSalonDto: CreateSalonDto) {
    return 'This action adds a new salon';
  }

  findAll() {
    return `This action returns all salon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} salon`;
  }

  update(id: number, updateSalonDto: UpdateSalonDto) {
    return `This action updates a #${id} salon`;
  }

  remove(id: number) {
    return `This action removes a #${id} salon`;
  }
}
