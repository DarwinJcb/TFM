import { Injectable } from '@nestjs/common';
import { CreateDonacioneDto } from './dto/create-donacione.dto';
import { UpdateDonacioneDto } from './dto/update-donacione.dto';

@Injectable()
export class DonacionesService {
  create(createDonacioneDto: CreateDonacioneDto) {
    return 'This action adds a new donacione';
  }

  findAll() {
    return `This action returns all donaciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} donacione`;
  }

  update(id: number, updateDonacioneDto: UpdateDonacioneDto) {
    return `This action updates a #${id} donacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} donacione`;
  }
}
