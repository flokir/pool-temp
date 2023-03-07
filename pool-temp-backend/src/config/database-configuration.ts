import * as process from 'process';
import { MeasurementEntity } from '../measurement/measurement.entity';
import { SensorEntity } from '../sensor/sensor.entity';

export default () => ({
  database: {
    type: 'postgres',
    database: process.env.DB_NAME || 'mydb',
    host: process.env.DB_HOST || 'db',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USER || 'myuser',
    password: process.env.DB_PASSWORD || 'mypassword',
    entities: [MeasurementEntity, SensorEntity],
    synchronize: true,
    logging: true,
  },
});
