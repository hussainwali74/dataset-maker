import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LanguageEntity } from './entities/language.entity';
import { LanguageService } from './language.service';

@ApiUnauthorizedResponse({ description: 'please provide a valid token' })
@ApiBearerAuth('token')
@ApiTags('Languages')
@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) { }

  @Get()
  findAll() {
    return this.languageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.languageService.findOne(+id);
  }

  @Post()
  create(@Body() language: LanguageEntity) {
    return this.languageService.create(language);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() language: LanguageEntity) {
    return this.languageService.update(+id, language);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.languageService.remove(+id);
  }

}
