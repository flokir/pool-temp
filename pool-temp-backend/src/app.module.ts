import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeasurementModule } from './measurement/measurement.module';
import { RouterModule } from '@nestjs/core';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
