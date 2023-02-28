import { MeasurementEntity } from '../measurement.entity';
import { IsDate, IsDateString, IsDecimal, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class MeasurementDto {
  @IsDecimal()
  value: number;

  @Type(() => Date)
  @IsDate()
  timestamp: Date;

  public static mapToMeasurement(dto: MeasurementDto): MeasurementEntity {
    return new MeasurementEntity({
      value: dto.value,
      timestamp: dto.timestamp,
    });
  }

  public static createFromMeasurement(
    entity: MeasurementEntity,
  ): MeasurementDto {
    return {
      value: entity.value,
      timestamp: entity.timestamp,
    };
  }
}
