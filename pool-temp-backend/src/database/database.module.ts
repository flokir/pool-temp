import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasurementEntity } from '../measurement/measurement.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'pool-temp.sqlite',
      entities: [MeasurementEntity],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
