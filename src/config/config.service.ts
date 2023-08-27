import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: parseInt('3306'),
  username: 'root',
  password: '',
  database: 'santaines',
  autoLoadEntities: true,
  // entities: [],
  synchronize: true,
};
// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'mysql',
//   host: process.env.MYSQL_HOST ?? 'localhost',
//   port: parseInt(process.env.MYSQL_PORT ?? '3306'),
//   username: process.env.MYSQL_USER ?? 'root',
//   password: process.env.MYSQL_PASSWORD ?? '',
//   database: process.env.MYSQL_DB ?? 'santaines',
//   autoLoadEntities: true,
//   // entities: [],
//   synchronize: true,
// };