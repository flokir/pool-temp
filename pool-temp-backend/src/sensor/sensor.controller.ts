import { Body, Controller, Get, Post } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { SensorListDto } from './dto/sensor-list.dto';
import { SensorDto } from './dto/sensor.dto';

@Controller('')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}
  @Get()
  public async getSensors(): Promise<SensorListDto> {
    const sensors = await this.sensorService.searchSensors();
    return {
      items: sensors.map((sensor) => SensorDto.createFromSensor(sensor)),
    };
  }

  @Post()
  public async createSensor(@Body() dto: SensorDto) {
    const sensor = SensorDto.mapToSensor(dto);
    const createdSensor = await this.sensorService.createSensor(sensor);
    return SensorDto.createFromSensor(createdSensor);
  }
}
