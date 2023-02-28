import { Module } from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { MeasurementController } from './measurement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasurementEntity } from './measurement.entity';

@Module({
  providers: [MeasurementService],
  controllers: [MeasurementController],
  imports: [TypeOrmModule.forFeature([MeasurementEntity])],
})
export class MeasurementModule {}
