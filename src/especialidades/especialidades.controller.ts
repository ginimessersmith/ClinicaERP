import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EspecialidadesService } from './especialidades.service';
import { CreateEspecialidadeDto } from './dto/create-especialidade.dto';
import { UpdateEspecialidadeDto } from './dto/update-especialidade.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('especialidades')
export class EspecialidadesController {
  constructor(private readonly especialidadesService: EspecialidadesService) {}

  @Post()
  create(@Body() createEspecialidadeDto: CreateEspecialidadeDto) {
    return this.especialidadesService.create(createEspecialidadeDto);
  }

  @Get()
  findAll(@Query() pagination:PaginationDto) {
    return this.especialidadesService.findAll(pagination);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.especialidadesService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEspecialidadeDto: UpdateEspecialidadeDto) {
    return this.especialidadesService.update(+id, updateEspecialidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.especialidadesService.remove(id);
  }
}
