import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitasModule } from './citas/citas.module';
import { DoctorsModule } from './doctors/doctors.module';
//import { UsersModule } from './users/users.module';
import { AdministrativosModule } from './administrativos/administrativos.module';

import { EspecialidadesModule } from './especialidades/especialidades.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { HistorialsModule } from './historials/historials.module';

@Module({
  imports: [ConfigModule.forRoot(),
  TypeOrmModule.forRoot({
    type:'postgres',
    host:process.env.DB_HOST,//local host
    port:+process.env.DB_PORT,
    database:process.env.DB_NAME,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    autoLoadEntities:true,
    synchronize:true
  }),
  CitasModule,
  DoctorsModule,
  //UsersModule,
  AdministrativosModule,
  EspecialidadesModule,
  CommonModule,
  AuthModule,
  HistorialsModule]

})
export class AppModule {}
