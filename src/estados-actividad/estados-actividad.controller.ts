/* src/estados-actividad/estados-actividad.controller.ts: */
import { Controller, Get, Post, Body, Patch, Param, Delete, } from '@nestjs/common';
import { EstadosActividadService } from './estados-actividad.service.js';
import { CreateEstadoActividadDto } from './dto/create-estado-actividad.dto.js';
import { UpdateEstadoActividadDto } from './dto/update-estado-actividad.dto.js';

@Controller('estados-actividad')
export class EstadosActividadController {
  constructor(
    private readonly estadosActividadService: EstadosActividadService,
  ) { }

  @Post()
  create(@Body() createEstadoActividadDto: CreateEstadoActividadDto) {
    return this.estadosActividadService.create(createEstadoActividadDto);
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
  update(
    @Param('id') id: string,
    @Body() updateEstadoActividadDto: UpdateEstadoActividadDto,
  ) {
    return this.estadosActividadService.update(+id, updateEstadoActividadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadosActividadService.remove(+id);
  }
}