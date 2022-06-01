import { IsString, IsNotEmpty, IsInt, Min, Max, IsOptional } from 'class-validator'
export class UpdatePersonDto {
    @IsOptional()
    @IsString()
    firstName: string

    @IsOptional()
    @IsString()
    lastName: string

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(120)
    age: number
}