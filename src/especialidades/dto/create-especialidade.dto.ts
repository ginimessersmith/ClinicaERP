import { IsString } from "class-validator";

export class CreateEspecialidadeDto {
    @IsString()
    nombre:string;

    @IsString()
    descripcion:string;
}
