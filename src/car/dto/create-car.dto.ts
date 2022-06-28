import { IsString, IsNotEmpty, IsNumber } from 'class-validator'
import { Person } from 'src/person/entity/person.entity'
export class CreateCarDto {
    @IsNotEmpty()
    @IsString()
    model: string

    @IsNotEmpty()
    @IsString()
    make: string

    @IsNotEmpty()
    @IsString()
    color: string

    @IsNotEmpty()
    @IsNumber()
    personId: Person
}