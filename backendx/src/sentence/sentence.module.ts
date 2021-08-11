import { forwardRef, Module } from '@nestjs/common';
import { SentenceService } from './sentence.service';
import { SentenceController } from './sentence.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SentenceEntity } from './entities/sentence.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SentenceEntity])
  ],
  controllers: [SentenceController],
  providers: [SentenceService]
})
export class SentenceModule { }
