/* src/restricciones/restricciones.controller.ts: */
import { Controller, Get, Post, Body, Patch, Param, Delete, } from '@nestjs/common';
import { RestriccionesService } from './restricciones.service.js';
import { CreateRestriccionDto } from './dto/create-restriccion.dto.js';
import { UpdateRestriccionDto } from './dto/update-restriccion.dto.js';

@Controller('restricciones')
export class RestriccionesController {
  constructor(private readonly restriccionesService: RestriccionesService) { }

  @Post()
  create(@Body() createRestriccionDto: CreateRestriccionDto) {
    return this.restriccionesService.create(createRestriccionDto);
  }

  @Get()
  findAll() {
    return this.restriccionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restriccionesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRestriccionDto: UpdateRestriccionDto,
  ) {
    return this.restriccionesService.update(+id, updateRestriccionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restriccionesService.remove(+id);
  }
}