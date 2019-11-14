import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export default class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;


    @Column()
    phone: string;

    @Column()
    firstName: string;

    @Column()
    middleName: string;

    @Column()
    lastName: string;

    @Column()
    organizationName: string;

    @Column()
    organizationAddress: string;

    @Column()
    organizationPhone: string;

    @Column()
    specialty: string;




    @Column({
        default: false
    })
    verification: boolean;
}