import { Injectable } from '@nestjs/common';
import { CreateAdministrativoDto } from './dto/create-administrativo.dto';
import { UpdateAdministrativoDto } from './dto/update-administrativo.dto';

@Injectable()
export class AdministrativosService {
  create(createAdministrativoDto: CreateAdministrativoDto) {
    return 'This action adds a new administrativo';
  }

  findAll() {
    return `This action returns all administrativos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} administrativo`;
  }

  update(id: number, updateAdministrativoDto: UpdateAdministrativoDto) {
    return `This action updates a #${id} administrativo`;
  }

  remove(id: number) {
    return `This action removes a #${id} administrativo`;
  }
}
