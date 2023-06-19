import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { Repository } from 'typeorm';
import { Cita } from './entities/cita.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { throws } from 'assert';
import { User } from 'src/auth/entities/user.entity';
import { Especialidade } from 'src/especialidades/entities/especialidade.entity';

@Injectable()
export class CitasService {
  constructor(
    @InjectRepository(Cita)
    private readonly citaRepository:Repository<Cita>,

    // @InjectRepository(User)
    // private readonly userRepository:Repository<User>
    
  ){

  }

  async create(createCitaDto: CreateCitaDto,user:User) {
    try {
      
      //const nuevaCita=this.citaRepository.create(createCitaDto);//solo crea la cita con los datos del dto
      //const user= await 
      //para guardar en la db
      const{...citaCreate} = createCitaDto
      await this.citaRepository.save({
        ...citaCreate,
        user:user,
      });
      
      console.log('se guardo la nueva cita')
    } catch (error) {
      
    }
  }

  findAll(paginationdto:PaginationDto) {
    const {limit=10 , offset=0} = paginationdto;// asignacion de valores por defecto
    return this.citaRepository.find({
      take:limit,//desestructuracion del pagination y 
      skip:offset,
      //relaciones
    });
  }

  async findOne(term: string) {
  
    if( !isNaN(parseInt(term))){
      return await this.citaRepository.findOneBy({id:+term});
    }
    
    throw new NotFoundException('no se encontro')
    //const cita=await this.citaRepository.findOneBy({term});
    //if(!cita) throw new NotFoundException('no se encontro')
    
    //return cita;
  }

  async update(id: number, updateCitaDto: UpdateCitaDto) {
    const cita = await this.citaRepository.preload({
      id:id,
      ...updateCitaDto,      
    });
    if(!cita) throw new NotFoundException(`cita id: ${id} not found `)
    try {
      await this.citaRepository.save(cita);// en este puento se actualiza
      return cita;
    } catch (error) {
        
    }
    
   
  }

  async remove(id: string) {
    const citaElim= await this.findOne(id);
    await this.citaRepository.remove(citaElim);
  }
}




