import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Person } from './entity/person.entity';
import { PersonService } from './person.service';

const testFirstName1 = 'First 1';
const testLastName1 = 'Last 1';

const personArray = [
  new Person(testFirstName1, testLastName1, 22),
  new Person('First 2', 'Last 2', 22),
  new Person('First 3', 'Last 3', 22),
];

const onePerson = new Person(testFirstName1, testLastName1, 22);
let deletedResult = new DeleteResult()
deletedResult.affected = 1

describe('PersonService', () => {
  let service: PersonService;
  let repo: Repository<Person>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonService,
        {
          provide: getRepositoryToken(Person),
          useValue: {
            find: jest.fn().mockResolvedValue(personArray),
            findOneBy: jest.fn().mockResolvedValue(onePerson),
            create: jest.fn().mockResolvedValue(onePerson),
            save: jest.fn().mockResolvedValue(onePerson),
            update: jest.fn().mockResolvedValue(onePerson),
            delete: jest.fn().mockResolvedValue(deletedResult),
          },
        },
      ],
    }).compile();

    service = module.get<PersonService>(PersonService);
    repo = module.get<Repository<Person>>(getRepositoryToken(Person));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getAllPeople', () => {
    it('should return an array of persons', async () => {
      const persons = await service.getAllPeople();
      expect(persons).toEqual(personArray);
    });
  });
  describe('getPersonById', () => {
    it('should get a single person', () => {
      const repoSpy = jest.spyOn(repo, 'findOneBy');
      expect(service.getPersonById(1)).resolves.toEqual(onePerson);
      expect(repoSpy).toBeCalledWith({ id: 1 });
    });
  });
  describe('createPerson', () => {
    it('should successfully create a person', async () => {
      const createPersonDto = {
        firstName: testFirstName1,
        lastName: testLastName1,
        age: 22,
      }
      const person = await service.createPerson(createPersonDto);
      expect(person).toEqual(onePerson);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toBeCalledWith(createPersonDto);
      expect(repo.save).toBeCalledTimes(1);
    });
  });
  describe('updatePerson', () => {
    it('should call the update method', async () => {
      const updatePersonDto = {
        firstName: testFirstName1,
        lastName: testLastName1,
        age: 22,
      }
      const person = await service.updatePerson(
        1,
        updatePersonDto
      );
      expect(person).toEqual(onePerson);
      expect(repo.update).toBeCalledTimes(1);
      expect(repo.update).toBeCalledWith(
        1, updatePersonDto);
    });
  });
  describe('deletePerson', () => {
    it('should return {deleted: true} if deleted', () => {
      expect(service.deletePerson(1)).resolves.toEqual({ deleted: true });
    });
    it('should return an http exception if no matches found', () => {
      const repoSpy = jest
        .spyOn(repo, 'delete')
        .mockRejectedValueOnce(new HttpException('Person not found', HttpStatus.NOT_FOUND));
      expect(service.deletePerson(1)).rejects.toThrow('Person not found');
      expect(repoSpy).toBeCalledWith({ id: 1 });
      expect(repoSpy).toBeCalledTimes(1);
    });
  });
});