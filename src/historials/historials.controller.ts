import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { HistorialsService } from './historials.service';
import { CreateHistorialDto } from './dto/create-historial.dto';
import { UpdateHistorialDto } from './dto/update-historial.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('historials')
export class HistorialsController {
  constructor(private readonly historialsService: HistorialsService) {}

  @Post()
  create(@Body() createHistorialDto: CreateHistorialDto) {
    return this.historialsService.create(createHistorialDto);
  }

  @Get()
  findAll(@Query() pagination:PaginationDto) {
    return this.historialsService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historialsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistorialDto: UpdateHistorialDto) {
    return this.historialsService.update(+id, updateHistorialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historialsService.remove(id);
  }
}
