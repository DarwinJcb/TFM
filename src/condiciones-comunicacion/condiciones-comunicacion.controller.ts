import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CondicionesComunicacionService } from './condiciones-comunicacion.service';
import { CreateCondicionesComunicacionDto } from './dto/create-condiciones-comunicacion.dto';
import { UpdateCondicionesComunicacionDto } from './dto/update-condiciones-comunicacion.dto';

@Controller('condiciones-comunicacion')
export class CondicionesComunicacionController {
  constructor(private readonly condicionesComunicacionService: CondicionesComunicacionService) {}

  @Post()
  create(@Body() createCondicionesComunicacionDto: CreateCondicionesComunicacionDto) {
    return this.condicionesComunicacionService.create(createCondicionesComunicacionDto);
  }

  @Get()
  findAll() {
    return this.condicionesComunicacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.condicionesComunicacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCondicionesComunicacionDto: UpdateCondicionesComunicacionDto) {
    return this.condicionesComunicacionService.update(+id, updateCondicionesComunicacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.condicionesComunicacionService.remove(+id);
  }
}
