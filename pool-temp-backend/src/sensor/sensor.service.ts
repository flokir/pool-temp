import { Injectable, NotFoundException } from '@nestjs/common';
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

  public async findSensorById(sensorId: string) {
    const sensor = await this.sensorRepository.findOneBy({
      id: sensorId,
    });
    if (!sensor) {
      throw new NotFoundException(`Sensor with id: ${sensorId} not found`);
    }
    return sensor;
  }
}
