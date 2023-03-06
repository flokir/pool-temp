import { Injectable } from '@nestjs/common';
import { SensorEntity } from './sensor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SensorService {
  constructor(
    @InjectRepository(SensorEntity)
    private readonly sensorRepository: Repository<SensorEntity>,
  ) {}
  public async searchSensors(): Promise<SensorEntity[]> {
    return this.sensorRepository.find();
  }

  public async createSensor(sensor: SensorEntity): Promise<SensorEntity> {
    return this.sensorRepository.save(sensor);
  }
}
