import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { off } from 'process';
import { doc } from 'prettier';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository:Repository<Doctor>
  ){}

  async create(createDoctorDto: CreateDoctorDto) {
    try {
      const nuevoDoctor=this.doctorRepository.create(createDoctorDto);
      await this.doctorRepository.save(nuevoDoctor);
      console.log('se a creado con exito');
    } catch (error) {
      throw new InternalServerErrorException('error al crear el doctor');
    }
  }

  findAll(pagination:PaginationDto) {
    const {limit=10,offset=0}=pagination;
    return this.doctorRepository.find({
take:limit,
skip:offset
    });
  }

  async findOne(term: string) {
    if(!isNaN(parseInt(term))){
      return await this.doctorRepository.findOneBy({id:+term});
    }

    throw new NotFoundException('no se encontro el doctor');
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    const doctor = await this.doctorRepository.preload({
      id:id,
      ...updateDoctorDto,
    })
    if(!doctor) throw new NotFoundException('no se encontro el doctor al actualizar')
  try {
    await this.doctorRepository.save(doctor);
    return doctor;
  } catch (error) {
    throw new BadRequestException('error en la actualizacion')
  }
  
  }

  async remove(id: string) {
    const doctorEliminar= await this.findOne(id);
    return this.doctorRepository.remove(doctorEliminar);
  }
}
