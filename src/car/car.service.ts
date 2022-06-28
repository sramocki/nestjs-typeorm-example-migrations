import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entity/car.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>
  ) {}

  async getAllCars(): Promise<Car[]> {
    return this.carRepository.find();
  }

  async getCarById(carId: number): Promise<Car> {
    const car = await this.carRepository.findOneBy({ id: carId });
    if (car) {
      return car;
    }
    throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
  }

  async createCar(createCarDto: CreateCarDto): Promise<Car> {
    const car = this.carRepository.create(createCarDto);
    return this.carRepository.save(car);
  }

  async updateCar(carId: number, updateCarDto: UpdateCarDto): Promise<Car> {
    await this.carRepository.update(carId, updateCarDto)
    const person = await this.carRepository.findOneBy({id: carId})
    if (person) {
      return person;
    }
  }

  async deleteCar(carId: number) {
    const deletedCar = await this.carRepository.delete({id: carId})
    if (!deletedCar.affected) {
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }
    return { deleted: true };
  }
}

