import { ApiProperty } from "@nestjs/swagger";
import { LanguageEntity } from "src/language/entities/language.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('sentence')
export class SentenceEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({ type: String, example: 'gute sentence cchen' })
    @Column('varchar')
    sentence: string

    @ApiProperty({ type: String, example: 'this sentence' })
    @Column('varchar')
    english_meaning: string

    @ApiProperty({ type: String, example: 'this/sentence.mp3' })
    @Column('varchar')
    audio: string //link of audio file

    @ManyToOne(() => LanguageEntity, language => language.sentences)
    @JoinColumn({ referencedColumnName: 'id', name: 'language_id' })
    language: LanguageEntity;

}
