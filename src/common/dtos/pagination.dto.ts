import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto{
    @IsOptional()
    @IsPositive()
    @Type(()=>Number)
    limit?:number;//cuantos valores

    @IsOptional()
    //@IsPositive()
    @Min(0)//valor minimo es 0
    @Type(()=>Number)//aqui transforma a numero el string
    offset?:number;//desde que valor
}