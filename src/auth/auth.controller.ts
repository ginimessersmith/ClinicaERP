import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { GetUser } from './decoratiors/get-user.decoratior';
import { RawHeaders } from './decoratiors/raw-header.decorator';
//import * as request from 'supertest';
import { UserRolesGuard } from './guards/user-roles/user-roles.guard';
import { RolesProtected } from './decoratiors/roles-protected/roles-protected.decorator';
import { ValidRoles } from './interfaces/validRoles.interface';
import { Auth } from './decoratiors/auth.decorator';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto:CreateUserDTO) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto:LoginUserDTO) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(
    @GetUser()user:User,
  ){
    return this.authService.checkAuthStatus(user);
  }

  // @Get('private')
  // @UseGuards(AuthGuard())  
  // testingPrivateRoute(@Req() request: Express.Request,
  // @GetUser()user:User, 
  // @GetUser('email')userEmail:string,
  // @RawHeaders() rawHeader:string[] ){
  //   //console.log({user:request.user})
  //   return {
  //     ok:true,
  //     mensaje:'hola mundo',
  //     user,
  //     userEmail,
  //     rawHeader
  //   }
  // }


  @Get('private2')
  //@SetMetadata('roles',['admin','super-user'])
  @RolesProtected(ValidRoles.superUser, ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRolesGuard)  
  testingPrivateRoute2(@GetUser() user:User,  ){
   
    return {
      ok:true,
      mensaje:'ruta privada 2',user
      
     
    }
  }

  @Get('private3')
  @Auth(ValidRoles.superUser,ValidRoles.admin) 
  testingPrivateRoute3(@GetUser() user:User,  ){
   
    return {
      ok:true,
      mensaje:'ruta privada 3',user     
     
    }
  }

  

  
}
