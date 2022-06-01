import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  getAllPeople() {
    return this.personService.getAllPeople();
  }
 
  @Get(':id')
  getPersonById(@Param('id') id: string) {
    return this.personService.getPersonById(Number(id));
  }
 
  @Post()
  async createPerson(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.createPerson(createPersonDto);
  }
 
  @Put(':id')
  async updatePerson(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.updatePerson(Number(id), updatePersonDto);
  }
 
  @Delete(':id')
  async deletePerson(@Param('id') id: string) {
    return this.personService.deletePerson(Number(id));
  }
}
