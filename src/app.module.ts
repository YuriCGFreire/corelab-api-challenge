import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
    } as TypeOrmModuleOptions),
    CarsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
