import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WordService } from './word.service';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { WordEntity } from './entities/word.entity';

@ApiUnauthorizedResponse({ description: 'please provide a valid token' })
@ApiBearerAuth('token')
@ApiTags('Words')
@Controller('word')
export class WordController {

  constructor(private readonly wordService: WordService) { }

  @Post()
  create(@Body() word: WordEntity) {
    return this.wordService.create(word);
  }

  @Get()
  findAll() {
    return this.wordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wordService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWord: WordEntity) {
    return this.wordService.update(+id, updateWord);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wordService.remove(+id);
  }
}
