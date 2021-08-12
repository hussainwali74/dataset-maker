import { forwardRef, Module } from '@nestjs/common';
import { SentenceService } from './sentence.service';
import { SentenceController } from './sentence.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SentenceEntity } from './entities/sentence.entity';
import { SentenceToSpeakerEntity } from './entities/sentencetospeaker.entity';
import { SentenceToSpeakerService } from './sentencetospeacker.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SentenceEntity,
      SentenceToSpeakerEntity
    ])
  ],
  controllers: [SentenceController],
  providers: [
    SentenceService,
    SentenceToSpeakerService
  ]
})
export class SentenceModule { }
