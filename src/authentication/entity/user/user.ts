import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';


@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({width: 100, nullable: false, name: 'firstName', })
    firstName: string;

    @Column({width: 100, nullable: true, name: 'lastName'})
    lastName: string;

    @Column({width: 50, nullable: false, name: 'userName'})
    userName: string;

    @Column({width: 1000, nullable: false, name: 'password'})
    password: string;

    @Column({nullable: false, name: 'isActive'})
    isActive: boolean;
}
