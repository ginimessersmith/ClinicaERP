import { Module } from '@nestjs/common';
import { HistorialsService } from './historials.service';
import { HistorialsController } from './historials.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Historial } from './entities/historial.entity';

@Module({
  controllers: [HistorialsController],
  providers: [HistorialsService],
  imports:[TypeOrmModule.forFeature([Historial])],
})
export class HistorialsModule {}
