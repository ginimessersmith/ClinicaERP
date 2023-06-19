import { Cita } from 'src/citas/entities/cita.entity';
import { Entity, PrimaryGeneratedColumn,Column, OneToMany } from 'typeorm';
@Entity()
export class Doctor {

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column('varchar')
    nombre:string;

    @Column('varchar')
    formacion:string;

    @Column('varchar')
    institucion:string;

    @Column('varchar')
    cargo:string;

    @OneToMany(
        ()=>Cita,
        (cita)=>cita.doctor,
        
    )
    citas:Cita;

}
