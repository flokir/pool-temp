import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('')
export class MeasurementController {
  // returns the current temperature
  @Get('current')
  public async getCurrentMeasurement() {
    return {
      timestamp: new Date(),
      value: 1.23,
    };
  }

  @Post()
  public async createMeasurement(@Body() measurement) {
    console.log(measurement);
    return measurement;
  }
}
