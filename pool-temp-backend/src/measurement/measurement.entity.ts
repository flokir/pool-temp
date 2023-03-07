import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SensorEntity } from '../sensor/sensor.entity';

@Entity('measurement')
export class MeasurementEntity {
  constructor(init: Partial<MeasurementEntity>) {
    Object.assign(this, init);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  timestamp: Date;

  @Column({
    type: 'float',
  })
  value: number;

  @ManyToOne(() => SensorEntity, (entity) => entity.measurements, {
    nullable: false,
  })
  sensor: SensorEntity;
}
