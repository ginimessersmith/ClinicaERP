import { User } from "src/auth/entities/user.entity";
import { Especialidade } from "src/especialidades/entities/especialidade.entity";
import { Entity,PrimaryGeneratedColumn,Column, ManyToOne } from "typeorm";
import { Doctor } from '../../doctors/entities/doctor.entity';

//representacion en la base de datos
@Entity()
export class Cita {
    
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column('varchar')
    motivo:string;

    @Column('date')
    fecha:Date;

    @Column('varchar')
    especialidad:string;

    @Column({type:'time'})
    horario:string;

    @Column({default:true})
    citaConfirmada:boolean;

    @ManyToOne(()=>User,
    (user)=>user.cita,
    {eager:true})
    user:User;

    @ManyToOne(
        ()=>Especialidade,
        (especialidades)=>especialidades.cita,
        {eager:true})
    especialidades:Especialidade;

    @ManyToOne(
        ()=>Doctor,
        (doctor)=>doctor.citas,
        {eager:true}
    )
    doctor:Doctor;

}
