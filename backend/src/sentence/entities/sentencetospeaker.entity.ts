import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SentenceEntity } from "./sentence.entity";

@Entity('sentencetospeaker')
export class SentenceToSpeakerEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({ type: String, example: 'gute sentence cchen' })
    @Column('varchar')
    audio_url: string

    @ApiProperty()
    @ManyToOne(() => SentenceEntity, sentence => sentence.sentenceToSpeaker)
    sentence: SentenceEntity;

    @ApiProperty()
    @ManyToOne(() => UserEntity, speaker => speaker.sentenceToSpeaker)
    speaker: UserEntity;

}
