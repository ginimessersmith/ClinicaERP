import { IsString } from "class-validator";

export class CreateDoctorDto {
    @IsString()
    nombre:string;

    @IsString()
    formacion:string;

    @IsString()
    institucion:string;

    @IsString()
    cargo:string;

}
