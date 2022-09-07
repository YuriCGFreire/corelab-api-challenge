import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Cars } from './entities/cars.entity';
import { CreateCarDTO } from './dto/create-car.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCarDTO } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Cars)
    private readonly carsRepository: Repository<Cars>,
  ) {}

  async createCar(createCarDTO: CreateCarDTO) {
    const car = await this.carsRepository.findOne({
      where: { plate: createCarDTO.plate },
    });
    if (car) {
      throw new HttpException(
        'This car already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const car = this.carsRepository.create(createCarDTO);
      return await this.carsRepository.save(car);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateCar(id: string, updateCarDTO: UpdateCarDTO) {
    const car = await this.findOne(id);
    this.carsRepository.merge(car, updateCarDTO);
    return await this.carsRepository.save(car);
  }

  async deleteCar(id: string) {
    return await this.carsRepository.delete(id);
  }

  async findOne(id: string) {
    try {
      return await this.carsRepository.findOneOrFail({
        where: { id },
      });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  async findAll() {
    return await this.carsRepository.find();
  }

  async findAllFavorites() {
    return await this.carsRepository.find({
      where: { isFavorite: true },
    });
  }

  async setFavorite(id: string) {
    const car = await this.carsRepository.findOne({ where: { id } });
    const isFavorite = car.isFavorite ? false : true;

    await this.carsRepository
      .createQueryBuilder()
      .update(Cars)
      .set({ isFavorite: isFavorite })
      .where({ id })
      .execute();

    return await this.findOne(id);
  }
}
