import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports:[ConfigModule,TypeOrmModule.forFeature([User]),
  PassportModule.register({defaultStrategy:'jwt'}),
  JwtModule.registerAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory:(configSer:ConfigService)=>{
      //console.log('JWT',configSer.get('JWT_SECRET'))
      return {
        secret:process.env.JWT_SECRET,
        signOptions:{expiresIn:'24h'  }}}

  })

  // JwtModule.register({
  //   secret:process.env.JWT_SECRET,
  //   signOptions:{expiresIn:'2h'}
  // }) mejor hacer esto en un modulo asincrono para estar seguro de la variable jwt-secret
  ],
  exports:[TypeOrmModule,JwtStrategy, PassportModule, JwtModule]
  
  
})
export class AuthModule {}
