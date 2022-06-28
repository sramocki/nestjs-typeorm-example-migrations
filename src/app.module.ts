import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from 'ormconfig'
import { PersonModule } from './person/person.module';
import { CarModule } from './car/car.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(AppDataSource.options),
    PersonModule,
    CarModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
