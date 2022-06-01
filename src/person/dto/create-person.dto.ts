import { IsString, IsNotEmpty, IsInt, Min, Max } from 'class-validator'
export class CreatePersonDto {
    @IsNotEmpty()
    @IsString()
    firstName: string

    @IsNotEmpty()
    @IsString()
    lastName: string

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(120)
    age: number
}