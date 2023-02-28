import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasurementEntity } from '../measurement/measurement.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'mydb',
      host: 'db',
      port: 5432,
      username: 'myuser',
      password: 'mypassword',
      entities: [MeasurementEntity],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
