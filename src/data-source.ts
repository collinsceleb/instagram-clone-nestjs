import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from './entity/User';

const configservice = new ConfigService();
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configservice.get('DB_HOST'),
  port: parseInt(configservice.get('DB_PORT')),
  username: configservice.get('DB_USERNAME'),
  password: configservice.get('DB_PASSWORD'),
  database: configservice.get('DB_NAME'),
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
