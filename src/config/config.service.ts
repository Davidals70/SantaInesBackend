import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config();

// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'mysql',
//   host: 'localhost',
//   port: parseInt('3306'),
//   username: 'root',
//   password: '',
//   database: 'santaines',
//   autoLoadEntities: true,
//   // entities: [],
//   synchronize: true,
// };
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  autoLoadEntities: true,
  // entities: [],
  synchronize: false,
  ssl: process.env.POSTGRES_SSL === "true",
  extra: {
    ssl: process.env.POSTGRES_SSL === "true" ? {rejectUnauthorized: false} : null
  }
};