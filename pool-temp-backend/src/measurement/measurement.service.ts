import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MeasurementEntity } from './measurement.entity';
import { And, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

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

  public async searchMeasurements(startDate: Date, endDate: Date) {
    const timestampConstraints = [];
    if (startDate) {
      timestampConstraints.push(MoreThanOrEqual(startDate));
    }
    if (endDate) {
      timestampConstraints.push(LessThanOrEqual(endDate));
    }

    return this.measurementRepository.find({
      order: {
        timestamp: 'desc',
      },
      where: {
        timestamp: And(...timestampConstraints),
      },
    });
  }

  public async createMeasurement(
    entity: MeasurementEntity,
  ): Promise<MeasurementEntity> {
    return this.measurementRepository.save(entity);
  }
}
