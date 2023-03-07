import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MeasurementEntity } from './measurement.entity';
import { And, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { SensorService } from '../sensor/sensor.service';

@Injectable()
export class MeasurementService {
  constructor(
    private readonly sensorService: SensorService,
    @InjectRepository(MeasurementEntity)
    private readonly measurementRepository: Repository<MeasurementEntity>,
  ) {}
  public async getCurrentMeasurement(
    sensorId: string,
  ): Promise<MeasurementEntity> {
    await this.sensorService.findSensorById(sensorId);

    const measurements = await this.measurementRepository.find({
      where: {
        sensor: { id: sensorId },
      },
      order: {
        timestamp: 'desc',
      },
      take: 1,
    });

    if (measurements.length === 1) {
      return measurements.at(0);
    }
    throw new NotFoundException('No measurements found for this sensor');
  }

  public async searchMeasurements(
    sensorId: string,
    startDate: Date,
    endDate: Date,
  ) {
    await this.sensorService.findSensorById(sensorId);

    const query = this.measurementRepository
      .createQueryBuilder('measurement')
      .leftJoin('measurement.sensor', 'sensor')
      .where('sensor.id = :sensorId');

    if (startDate) {
      query.andWhere('timestamp >= :startDate');
    }
    if (endDate) {
      query.andWhere('timestamp <= :endDate');
    }

    query.setParameters({
      startDate,
      endDate,
      sensorId,
    });

    return query.getMany();
  }

  public async createMeasurement(
    sensorId: string,
    entity: MeasurementEntity,
  ): Promise<MeasurementEntity> {
    const sensor = await this.sensorService.findSensorById(sensorId);
    entity.sensor = sensor;
    return this.measurementRepository.save(entity);
  }
}
