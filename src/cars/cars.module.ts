import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cars } from './entities/cars.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cars])],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
