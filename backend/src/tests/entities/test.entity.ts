import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Test {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar')
    name: string;
}
