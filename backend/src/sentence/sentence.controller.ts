import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SentenceEntity } from './entities/sentence.entity';
import { SentenceService } from './sentence.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage, storageCsv } from './storage.config';

import * as csv from 'fast-csv';
const fs = require('fs');
import { unlink } from 'fs/promises';

@ApiUnauthorizedResponse({ description: 'please provide a valid token' })
@ApiBearerAuth('token')
@ApiTags('Sentences')
@Controller('sentence')
export class SentenceController {

  constructor(private readonly sentenceService: SentenceService) { }

  @Get()
  findAll() {
    return this.sentenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sentenceService.findOne(+id);
  }

  @Post()
  create(@Body() sentence: SentenceEntity) {
    return this.sentenceService.create(sentence);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage
    })
  )
  uploadFiles(@UploadedFile() file) {
    console.log(file);
  }

  // ==================================================================
  //              CSV
  // ==================================================================

  @Post('/upload_csv')
  @UseInterceptors(
    FileInterceptor('file', {
      // dest: './uploads'
      storage: storageCsv

    })
  )
  async uploadCSVFiles(@UploadedFile() file) {
    console.log(file);
    const filepath = file.path;

    //parse csv
    fs.createReadStream(filepath)
      .pipe(csv.parse({ headers: ['sentence'] }))
      .on('error', error => console.log(`error`, error))
      .on('data', row => console.log(`row`, row.sentence))
      .on('end', (rowCount: number) => console.log(`rowCount`, rowCount))

    //delete file
    try {
      await unlink(filepath)
      console.log("successfully deleted file ", filepath)
    } catch (error) {
      console.log('-----------------------------------------------------')
      console.log("error in deleting file :>>", error)
      console.log('-----------------------------------------------------')
    }

  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() sentence: SentenceEntity) {
    return this.sentenceService.update(+id, sentence);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sentenceService.remove(+id);
  }
}
