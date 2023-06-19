import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CitasService } from './citas.service';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { User } from 'src/auth/entities/user.entity';
import { Auth } from 'src/auth/decoratiors/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/validRoles.interface';
import { GetUser } from 'src/auth/decoratiors/get-user.decoratior';
import { Especialidade } from 'src/especialidades/entities/especialidade.entity';

@Controller('citas')
@Auth()
export class CitasController {
  constructor(private readonly citasService: CitasService) {}

  @Post()
  @Auth()
  create(@Body() createCitaDto: CreateCitaDto,
  @GetUser() user:User,) {
    return this.citasService.create(createCitaDto,user);
  }

  @Get()
  //@Auth(ValidRoles.user)
  @Auth()
  findAll(@Query() paginationdto:PaginationDto) {
    console.log(paginationdto);
    return this.citasService.findAll(paginationdto);
  }

  @Get(':term')
  @Auth()
  findOne(@Param('term') term: string) {
    return this.citasService.findOne(term);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updateCitaDto: UpdateCitaDto) {
    return this.citasService.update(+id, updateCitaDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.citasService.remove(id);
  }
}
