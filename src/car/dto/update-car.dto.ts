import { IsString, IsNotEmpty, IsInt, Min, Max, IsOptional } from 'class-validator'
export class UpdateCarDto {
    @IsOptional()
    @IsString()
    model: string

    @IsOptional()
    @IsString()
    make: string

    @IsOptional()
    @IsString()
    color: string
}