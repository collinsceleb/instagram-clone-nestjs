import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Auth } from './users/entities/auth.entity';
import { Post } from './posts/entities/post.entity';

const configservice = new ConfigService();
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configservice.get('DB_HOST'),
  port: parseInt(configservice.get('DB_PORT')),
  username: 'postgres',
  password: 'Collinsceleb21&',
  database: configservice.get('DB_NAME'),
  synchronize: true,
  logging: false,
  entities: [Auth, Post],
  migrations: [],
  subscribers: [],
});
