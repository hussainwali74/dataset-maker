import { ApiProperty } from "@nestjs/swagger";
import { SentenceEntity } from "src/sentence/entities/sentence.entity";
import { SharedEntity } from "src/shared/shared.entity";
import { WordEntity } from "src/word/entities/word.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('language')
export class LanguageEntity extends SharedEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({ type: String, example: "Burushaski" })
    @Column('varchar')
    name: string;

    // @ApiProperty({ type: String, example: "khan@gmail.com" })
    // @Column('varchar')
    // email: string;


    // @ApiProperty({ type: String, example: "12345" })
    // @Column('varchar')
    // password: string;
    @OneToMany(() => WordEntity, (word) => word.language)
    words: WordEntity[];

    @OneToMany(() => SentenceEntity, (sentence) => sentence.language, { cascade: ['insert', 'update'], onDelete: 'CASCADE' })
    sentences: SentenceEntity[];

}
