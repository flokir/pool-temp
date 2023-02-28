import { Module } from '@nestjs/common';
import { MeasurementModule } from './measurement/measurement.module';
import { RouterModule } from '@nestjs/core';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    MeasurementModule,
    RouterModule.register([
      {
        path: 'api/v1',
        children: [
          {
            path: 'measurements',
            module: MeasurementModule,
          },
        ],
      },
    ]),
    DatabaseModule,
  ],
})
export class AppModule {}
