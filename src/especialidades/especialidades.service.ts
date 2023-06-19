import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEspecialidadeDto } from './dto/create-especialidade.dto';
import { UpdateEspecialidadeDto } from './dto/update-especialidade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Especialidade } from './entities/especialidade.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class EspecialidadesService {
  
  constructor(
    @InjectRepository(Especialidade)
  private readonly especialidadesRepository:Repository<Especialidade>
  ){ }


  create(createEspecialidadeDto: CreateEspecialidadeDto) {
    try {
      const nuevaEspecialidad=this.especialidadesRepository.create(createEspecialidadeDto);
      this.especialidadesRepository.save(nuevaEspecialidad);
      console.log('se inserto');
    } catch (error) {
      throw new BadRequestException('error');
    }
  }

  findAll(pagination:PaginationDto) {
    const {limit=10, offset=0}=pagination;
    return this.especialidadesRepository.find({
      take:limit,
      skip:offset,
      //relaciones
    });
  }

  async findOne(term: string) {
    let especialidades:Especialidade;
    if(!isNaN(parseInt(term))){
      return await this.especialidadesRepository.findOneBy({id:+term});
    }else{
      return await this.especialidadesRepository.findOneBy({nombre:term});
    }
    
  }

  update(id: number, updateEspecialidadeDto: UpdateEspecialidadeDto) {
    return `This action updates a #${id} especialidade`;
  }

  async remove(id: string) {
    const especialiElim= await this.findOne(id);
    this.especialidadesRepository.remove(especialiElim);
  }
}
