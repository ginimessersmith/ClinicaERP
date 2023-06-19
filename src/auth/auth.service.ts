import { BadRequestException, Delete, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from "bcrypt";
import { LoginUserDTO } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt.interface';
import { JwtService } from '@nestjs/jwt';
import { use } from 'passport';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }


  async create(createUserDto: CreateUserDTO) {
    try {

      const { password, ...useData } = createUserDto;  //desestructuracion del dto\

      const newUser = this.userRepository.create({
        ...useData,
        password: bcrypt.hashSync(password, 10)
      });//crea, mientras se aplica la desestructuracion

      await this.userRepository.save(newUser);//guarda en la db    
      delete newUser.password;//para q no se vea el password

      //retonar el token
      return { ...newUser, token: this.getJWT({ id: newUser.id }) };


    } catch (error) {
      this.handleDBError(error);
    }
    return 'This action adds a new auth';
  }

  async login(loginUserDto: LoginUserDTO) {
    const { email, password } = loginUserDto;//desestructurar para acceder al email y password
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true,id:true,roles:true,fullname:true}
    });//logica de verificacion si existe el user

    if (!user) throw new NotFoundException('credenciales incorrectas');

    if (!bcrypt.compareSync(password, user.password)) throw new NotFoundException('contrasena incorrecta');
    //si no hacen match las contrasenas::::::::::::::::
    delete user.password;
    return await{...user, token: this.getJWT({ id: user.id }) };
    
    //retornar el jwt
  }


  private handleDBError(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    console.log(error);
    throw new InternalServerErrorException('Error: Internal Server')
  }


  async checkAuthStatus(user:User) {
    return await({
      ...user,
      token:this.getJWT({id:user.id})
    })
  }


  private getJWT(payload: JwtPayload) {
    //usamos el servicio proveido por mi
    const token = this.jwtService.sign(payload);
    return token;
  }


}
