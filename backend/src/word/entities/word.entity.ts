import { ApiProperty } from "@nestjs/swagger";
import { LanguageEntity } from "src/language/entities/language.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('word')
export class WordEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({ type: String, example: 'cchen' })
    @Column('varchar')
    word: string

    @ApiProperty({ type: String, example: 'bird' })
    @Column('varchar')
    english_meaning: string

    @ApiProperty({ type: String, example: 'bird' })
    @Column('varchar')
    type: string; //verb, noun, adj etc

    @ApiProperty({ type: String, example: 'this/sentence.mp3' })
    @Column('varchar')
    audio: string //link of audio file

    @ManyToOne(() => LanguageEntity, language => language.words)
    @JoinColumn({ referencedColumnName: 'id', name: 'language_id' })
    language: LanguageEntity;

}
