import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MeasurementEntity } from '../measurement/measurement.entity';

@Entity('sensor')
export class SensorEntity {
  constructor(init: Partial<SensorEntity>) {
    Object.assign(this, init);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => MeasurementEntity, (entity) => entity.sensor)
  measurements: MeasurementEntity[];
}
