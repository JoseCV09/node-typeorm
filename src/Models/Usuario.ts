import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id_usuario: number;

    @Column()    
    nombre_usuario: string;
    
    @Column()
    apellido_usuario: string;

}