import { Cita } from "src/citas/entities/cita.entity";
import { Historial } from "src/historials/entities/historial.entity";
//import { HistorialClinico } from "src/historial-clinicos/entities/historial-clinico.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column('varchar',{unique:true})
    email:string
    
    @Column('varchar',{select:false})
    password:string

    @Column('varchar')
    fullname:string

    @Column('bool',{default:true})
    isActive:boolean;

    @Column('text',{array:true,default:['user']})
    roles:string[];

    @OneToMany(
        ()=>Cita,
        (cita)=>cita.user
    )
    cita:Cita;

    @OneToOne(
        ()=>Historial,
        (historial)=>historial.idUser,
        
    )
    historial:Historial;
    
}
