import { Cita } from 'src/citas/entities/cita.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
@Entity()
export class Especialidade {

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column('varchar')
    nombre:string;

    @Column('varchar')
    descripcion:string;

    @OneToMany(
        ()=>Cita,
        (cita)=>cita.especialidades,
        
        )
    cita:Cita;


}
