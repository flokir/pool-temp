import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { MeasurementDto } from './dto/measurement.dto';
import { MeasurementListDto } from './dto/measurement-list.dto';
import { SearchMeasurementsDto } from './dto/search-measurements.dto';

@Controller('')
export class MeasurementController {
  constructor(private readonly measurementService: MeasurementService) {}
  // returns the current temperature
  @Get('current')
  public async getCurrentMeasurement(): Promise<MeasurementDto> {
    return MeasurementDto.createFromMeasurement(
      await this.measurementService.getCurrentMeasurement(),
    );
  }

  @Get()
  public async searchMeasurements(
    @Query() searchDto: SearchMeasurementsDto,
  ): Promise<MeasurementListDto> {
    const measurements = await this.measurementService.searchMeasurements(
      searchDto.startDate,
      searchDto.endDate,
    );

    return {
      items: measurements.map((measurement) =>
        MeasurementDto.createFromMeasurement(measurement),
      ),
    };
  }

  // create a new measurement
  @Post()
  public async createMeasurement(@Body() measurementDto: MeasurementDto) {
    console.log(measurementDto);
    return MeasurementDto.createFromMeasurement(
      await this.measurementService.createMeasurement(
        MeasurementDto.mapToMeasurement(measurementDto),
      ),
    );
  }
}
