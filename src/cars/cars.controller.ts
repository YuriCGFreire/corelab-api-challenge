import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDTO } from './dto/create-car.dto';
import { UpdateCarDTO } from './dto/update-car.dto';

@Controller('vehicles')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  async createCar(@Body() createCarDTO: CreateCarDTO) {
    return await this.carsService.createCar(createCarDTO);
  }

  @Get()
  async findAll() {
    return await this.carsService.findAll();
  }

  @Get('isfavorite')
  async findAllFavorites() {
    return await this.carsService.findAllFavorites();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.carsService.findOne(id);
  }

  @Patch(':id')
  async updateCar(@Param('id') id: string, @Body() updateCarDTO: UpdateCarDTO) {
    return await this.carsService.updateCar(id, updateCarDTO);
  }

  @Delete(':id')
  async deleteCar(@Param('id') id: string) {
    return await this.carsService.deleteCar(id);
  }

  @Patch('isfavorite/:id')
  async setFavorie(@Param('id') id: string) {
    return await this.carsService.setFavorite(id);
  }
}
