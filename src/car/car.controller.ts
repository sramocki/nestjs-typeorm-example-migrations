import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarService } from './car.service';
import { Car } from './entity/car.entity';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  async getAllCar(): Promise<Car[]> {
    return this.carService.getAllCars();
  }
 
  @Get(':id')
  async getCarById(@Param('id') id: string): Promise<Car> {
    return this.carService.getCarById(Number(id));
  }
 
  @Post()
  async createCar(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this.carService.createCar(createCarDto);
  }
 
  @Put(':id')
  async updateCar(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto): Promise<Car> {
    return this.carService.updateCar(Number(id), updateCarDto);
  }
 
  @Delete(':id')
  async deleteCar(@Param('id') id: string) {
    return this.carService.deleteCar(Number(id));
  }
}
