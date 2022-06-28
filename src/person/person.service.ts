import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entity/person.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>
  ) {}

  async getAllPeople(): Promise<Person[]> {
    return this.personRepository.find();
  }

  async getPersonById(personId: number): Promise<Person> {
    const person = await this.personRepository.findOneBy({ id: personId });
    if (person) {
      return person;
    }
    throw new HttpException('Person not found', HttpStatus.NOT_FOUND);
  }

  async createPerson(createPersonDto: CreatePersonDto): Promise<Person> {
    const person = this.personRepository.create(createPersonDto);
    return this.personRepository.save(person);
  }

  async updatePerson(personId: number, updatePersonDto: UpdatePersonDto): Promise<Person> {
    await this.personRepository.update(personId, updatePersonDto)
    const person = await this.personRepository.findOneBy({id: personId})
    if (person) {
      return person;
    }
  }

  async deletePerson(personId: number) {
    const deletedPerson = await this.personRepository.delete({id: personId})
    if (!deletedPerson.affected) {
      throw new HttpException('Person not found', HttpStatus.NOT_FOUND);
    }
    return { deleted: true };
  }

  async testQuery(): Promise<Person> {
    return this.personRepository.createQueryBuilder("person")
    .leftJoinAndSelect("person.cars", "car")
    //.innerJoinAndSelect("person.cars", "car")
    //.where("person.firstName = :name", { name: "Sean" })
    .getOne()
  }
}

