import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SensorEntity {
  constructor(init: Partial<SensorEntity>) {
    Object.assign(this, init);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
