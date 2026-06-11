import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DonacionesService } from './donaciones.service';
import { CreateDonacioneDto } from './dto/create-donacione.dto';
import { UpdateDonacioneDto } from './dto/update-donacione.dto';

@Controller('donaciones')
export class DonacionesController {
  constructor(private readonly donacionesService: DonacionesService) {}

  @Post()
  create(@Body() createDonacioneDto: CreateDonacioneDto) {
    return this.donacionesService.create(createDonacioneDto);
  }

  @Get()
  findAll() {
    return this.donacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donacionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDonacioneDto: UpdateDonacioneDto) {
    return this.donacionesService.update(+id, updateDonacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donacionesService.remove(+id);
  }
}
