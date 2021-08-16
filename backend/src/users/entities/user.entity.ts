import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/auth/models/role.enum";
import { LanguageEntity } from "src/language/entities/language.entity";
import { SentenceToSpeakerEntity } from "src/sentence/entities/sentencetospeaker.entity";
import { SharedEntity } from "src/shared/shared.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity extends SharedEntity {

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
    //roles:['admin','language_expert']
    @Column({ type: 'enum', enum: Role, default: Role.EXPERT })
    role: string;

    //speaker
    @OneToMany(() => SentenceToSpeakerEntity, sentenceToSpeaker => sentenceToSpeaker.speaker, { cascade: true })
    sentenceToSpeaker: SentenceToSpeakerEntity[]

    @ManyToMany(() => LanguageEntity)
    @JoinTable()
    languages: LanguageEntity[];
}
