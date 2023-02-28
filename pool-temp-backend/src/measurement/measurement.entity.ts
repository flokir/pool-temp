import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
