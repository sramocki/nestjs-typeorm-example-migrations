import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entity/person.entity';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  async getAllPeople(): Promise<Person[]> {
    return this.personService.getAllPeople();
  }
 
  @Get(':id')
  async getPersonById(@Param('id') id: string): Promise<Person> {
    return this.personService.getPersonById(Number(id));
  }
 
  @Post()
  async createPerson(@Body() createPersonDto: CreatePersonDto): Promise<Person> {
    return this.personService.createPerson(createPersonDto);
  }
 
  @Put(':id')
  async updatePerson(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto): Promise<Person> {
    return this.personService.updatePerson(Number(id), updatePersonDto);
  }
 
  @Delete(':id')
  async deletePerson(@Param('id') id: string) {
    return this.personService.deletePerson(Number(id));
  }

  // Not actually a PATCH, used for testing!
  @Patch()
  async testQuery(): Promise<Person> {
    return this.personService.testQuery();
  }
}
