import { Module } from '@nestjs/common';
import { WordService } from './word.service';
import { WordController } from './word.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordEntity } from './entities/word.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WordEntity])],
  controllers: [WordController],
  providers: [WordService]
})
export class WordModule { }
