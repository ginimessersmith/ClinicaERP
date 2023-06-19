import { IsInt, IsNumber, IsPositive, IsString, MinLength } from "class-validator";
import { Especialidade } from '../../especialidades/entities/especialidade.entity';

export class CreateCitaDto {
    @IsString()
    @MinLength(1)
    motivo:string;
    
    @IsString()
    fecha:Date;

    @IsString()
    @MinLength(1)
    especialidad:string;
    
    @IsString()
    horario:string;

    
    idespecialidades:Especialidade;
    
    
}
