import { IsString, MinLength } from "class-validator";

export class CreateHistorialDto {
    @IsString()
    @MinLength(1)   
    enfermedadDiagnosticada:string;
  
    @IsString()
    @MinLength(1)  
    sintomas:string;
  
    @IsString() 
    fecha:Date;
   
    @IsString()
    @MinLength(1)  
    estadoPaciente:String;
}
