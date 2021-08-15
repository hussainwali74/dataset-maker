import { ApiProperty } from "@nestjs/swagger";
import { LanguageEntity } from "src/language/entities/language.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SentenceToSpeakerEntity } from "./sentencetospeaker.entity";

@Entity('sentence')
export class SentenceEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({ type: String, example: 'gute sentence cchen' })
    @Column('varchar')
    sentence: string

    @ApiProperty({ type: String, example: 'gute sentence cchen' })
    @Column({ type: 'boolean', default: false })
    sample: boolean

    @ApiProperty({ type: String, example: 'this sentence' })
    @Column('varchar')
    english_meaning: string

    @ApiProperty({ type: String, example: 'this/sentence.mp3' })
    @Column('varchar')
    audio: string //link of audio file

    @ManyToOne(() => LanguageEntity, language => language.sentences)
    @JoinColumn({ referencedColumnName: 'id', name: 'language_id' })
    language: LanguageEntity;

    //one sentence can have many speakers,
    @OneToMany(() => SentenceToSpeakerEntity, sentenceToSpeaker => sentenceToSpeaker.sentence, { cascade: true })
    sentenceToSpeaker: SentenceToSpeakerEntity[]

}
