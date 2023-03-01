import { MeasurementEntity } from '../measurement.entity';
import {
  IsDate,
  IsDateString,
  IsDecimal,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class MeasurementDto {
  @IsDecimal()
  value: number;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  timestamp: Date = new Date(); // if no timestamp is given, use the current time

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
