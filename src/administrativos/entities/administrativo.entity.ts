import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Administrativo {

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column('varchar')
    nombre:string;

    @Column('varchar')
    cargo:string;

    
}
