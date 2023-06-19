import { IsString } from "class-validator";

export class CreateAdministrativoDto {
    @IsString()
    nombre:string;
    
    @IsString()
    cargo:string;

}
