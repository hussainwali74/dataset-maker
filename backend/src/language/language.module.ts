import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageEntity } from './entities/language.entity';
import { LanguageController } from './language.controller';
import { LanguageService } from './language.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LanguageEntity])
  ],
  controllers: [LanguageController],
  providers: [LanguageService],
  exports: [LanguageService]
})
export class LanguageModule { }
