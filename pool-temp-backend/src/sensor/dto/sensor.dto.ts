import { SensorEntity } from '../sensor.entity';
import { IsString } from 'class-validator';

export class SensorDto {
  id: string;

  @IsString()
  name: string;

  public static createFromSensor(sensor: SensorEntity): SensorDto {
    return {
      id: sensor.id,
      name: sensor.name,
    };
  }

  public static mapToSensor(sensorDto: SensorDto): SensorEntity {
    return new SensorEntity({
      name: sensorDto.name,
    });
  }
}
