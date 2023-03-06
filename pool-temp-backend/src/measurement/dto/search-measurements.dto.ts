import { IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchMeasurementsDto {
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  endDate: Date;
}
