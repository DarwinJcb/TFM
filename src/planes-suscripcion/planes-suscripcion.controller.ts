/* src/planes-suscripcion/planes-suscripcion.controller.ts: */
import { Controller, Get, Post, Body, Patch, Param, Delete, } from '@nestjs/common';
import { PlanesSuscripcionService } from './planes-suscripcion.service.js';
import { CreatePlanSuscripcionDto } from './dto/create-plan-suscripcion.dto.js';
import { UpdatePlanSuscripcionDto } from './dto/update-plan-suscripcion.dto.js';

@Controller('planes-suscripcion')
export class PlanesSuscripcionController {
  constructor(
    private readonly planesSuscripcionService: PlanesSuscripcionService,
  ) { }

  @Post()
  create(@Body() createPlanSuscripcionDto: CreatePlanSuscripcionDto) {
    return this.planesSuscripcionService.create(createPlanSuscripcionDto);
  }

  @Get()
  findAll() {
    return this.planesSuscripcionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planesSuscripcionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlanSuscripcionDto: UpdatePlanSuscripcionDto,
  ) {
    return this.planesSuscripcionService.update(
      +id,
      updatePlanSuscripcionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planesSuscripcionService.remove(+id);
  }
}
