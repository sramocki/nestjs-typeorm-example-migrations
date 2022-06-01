import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

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