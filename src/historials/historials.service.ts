import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateHistorialDto } from './dto/create-historial.dto';
import { UpdateHistorialDto } from './dto/update-historial.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Historial } from './entities/historial.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class HistorialsService {
  constructor(
    @InjectRepository(Historial)
    private readonly historialRepository: Repository<Historial>,

  ) { }


  async create(createHistorialDto: CreateHistorialDto) {
    try {
      const nuevoHistorial = this.historialRepository.create(createHistorialDto);
      await this.historialRepository.save(nuevoHistorial);
      console.log('se inserto el nuevo historial');

    } catch (error) {
      throw new BadRequestException('error al insertar el nuevo historial');
    }
  }

  findAll(pagination: PaginationDto) {
    const { limit = 10, offset = 0 } = pagination;
    return this.historialRepository.find({
      take: limit,
      skip: offset

    });
  }

  async findOne(term: string) {
    if (!isNaN(parseInt(term))) {
      return await this.historialRepository.findOneBy({ id: +term });
    }
    throw new NotFoundException('no se encontro el historial');
  }

  async update(id: number, updateHistorialDto: UpdateHistorialDto) {
    const historial=await this.historialRepository.preload({
      id:id,
      ...updateHistorialDto,
    });
    if(!historial) throw new NotFoundException('no se encontro el historial para actualizar')
  try {
    await this.historialRepository.save(historial);
    return historial;

  } catch (error) {
    throw new NotFoundException('error al actualizar el historial');
  }
  }

  async remove(id: string) {
    const historialElim= await this.findOne(id);
    await this.historialRepository.remove(historialElim);
  }
}
