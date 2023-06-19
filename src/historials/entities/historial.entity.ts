import { User } from "src/auth/entities/user.entity";
import { Entity,PrimaryGeneratedColumn,Column, ManyToOne, OneToOne } from "typeorm";

@Entity()
export class Historial {
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column('varchar')
    enfermedadDiagnosticada:string;
    @Column('varchar')
    sintomas:string;
    @Column('date')
    fecha:Date;
    @Column('varchar')
    estadoPaciente:String;

    @OneToOne(
        ()=>User,
        (user)=>user.historial,
        {eager:true}
    )
    idUser:number;


}
