import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MeasurementEntity } from './measurement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MeasurementService {
  constructor(
    @InjectRepository(MeasurementEntity)
    private readonly measurementRepository: Repository<MeasurementEntity>,
  ) {}
  public async getCurrentMeasurement(): Promise<MeasurementEntity> {
    const measurements = await this.measurementRepository.find({
      order: {
        timestamp: 'desc',
      },
      take: 1,
    });

    if (measurements.length === 1) {
      return measurements.at(0);
    }

    // no measurement found
    throw new NotFoundException();
  }

  public async createMeasurement(
    entity: MeasurementEntity,
  ): Promise<MeasurementEntity> {
    return this.measurementRepository.save(entity);
  }
}
