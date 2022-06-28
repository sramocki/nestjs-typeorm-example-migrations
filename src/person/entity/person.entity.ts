import { Car } from "src/car/entity/car.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @OneToMany(() => Car, car => car.person, {
      eager: true})
    cars: Car[];

    constructor(firstName: string, lastName?: string, age?: number);
    constructor(firstName: string, lastName: string, age?: number);
    constructor(firstName: string, lastName: string, age: number);
    constructor(firstName?: string, lastName?: string, age?: number);
    constructor(firstName?: string, lastName?: string, age?: number) {
      this.firstName = firstName || '';
      this.lastName = lastName || '';
      this.age = age || NaN;
    }
}