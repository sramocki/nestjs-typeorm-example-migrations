import { Person } from "src/person/entity/person.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"

@Entity()
export class Car {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    model: string;

    @Column()
    make: string;

    @Column({nullable: true})
    year: number;

    @Column({nullable: true})
    color: string;

    @ManyToOne(() => Person, person => person.cars)
    @JoinColumn({name: "personId"})
    person: Person;
}