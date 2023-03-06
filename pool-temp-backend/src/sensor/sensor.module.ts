import { Module } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { SensorController } from './sensor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorEntity } from './sensor.entity';

@Module({
  providers: [SensorService],
  controllers: [SensorController],
  imports: [TypeOrmModule.forFeature([SensorEntity])],
})
export class SensorModule {}
