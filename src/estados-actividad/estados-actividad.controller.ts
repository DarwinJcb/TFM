import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadosActividadService } from './estados-actividad.service';
import { CreateEstadosActividadDto } from './dto/create-estados-actividad.dto';
import { UpdateEstadosActividadDto } from './dto/update-estados-actividad.dto';

@Controller('estados-actividad')
export class EstadosActividadController {
  constructor(private readonly estadosActividadService: EstadosActividadService) {}

  @Post()
  create(@Body() createEstadosActividadDto: CreateEstadosActividadDto) {
    return this.estadosActividadService.create(createEstadosActividadDto);
  }

  @Get()
  findAll() {
    return this.estadosActividadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadosActividadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadosActividadDto: UpdateEstadosActividadDto) {
    return this.estadosActividadService.update(+id, updateEstadosActividadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadosActividadService.remove(+id);
  }
}
