import { ApiProperty } from "@nestjs/swagger";
import { LanguageEntity } from "src/language/entities/language.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({ type: String, example: "khan" })
    @Column('varchar')
    name: string;

    @ApiProperty({ type: String, example: "khan@gmail.com" })
    @Column('varchar')
    email: string;

    @ApiProperty({ type: String, example: "12345" })
    @Column('varchar')
    password: string;

    @ApiProperty({ type: String, example: "admin" })
    @Column('varchar')
    role: string;

    //speaker
    @OneToMany(() => LanguageEntity, language => language.speaker)
    language: LanguageEntity[];

}
