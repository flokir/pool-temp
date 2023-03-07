import { Module } from '@nestjs/common';
import { MeasurementModule } from './measurement/measurement.module';
import { RouterModule } from '@nestjs/core';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { SensorModule } from './sensor/sensor.module';
import databaseConfiguration from './config/database-configuration';

@Module({
  imports: [
    MeasurementModule,
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
      load: [databaseConfiguration],
    }),
    RouterModule.register([
      {
        path: 'api/v1',
        children: [
          {
            path: '/sensors/:sensorId/measurements',
            module: MeasurementModule,
          },
          {
            path: 'sensors',
            module: SensorModule,
          },
        ],
      },
    ]),
    DatabaseModule,
    SensorModule,
  ],
})
export class AppModule {}
