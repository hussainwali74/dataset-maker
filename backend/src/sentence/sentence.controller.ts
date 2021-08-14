import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SentenceEntity } from './entities/sentence.entity';
import { SentenceService } from './sentence.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage, storageCsv } from './storage.config';
const mv = require('mv');
const path = require("path")



import * as csv from 'fast-csv';
const fs = require('fs');
import { unlink } from 'fs/promises';
import { SharedService } from 'src/shared/shared.service';

@ApiUnauthorizedResponse({ description: 'please provide a valid token' })
@ApiBearerAuth('token')
@ApiTags('Sentences')
@Controller('sentence')
export class SentenceController {

  constructor(private readonly sentenceService: SentenceService, private sharedService: SharedService) { }

  @Get()
  findAll() {
    return this.sentenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sentenceService.findOne(+id);
  }

  @Get('language/:id')
  getSentenceByLanguageId(@Param('id') id: string) {
    return this.sentenceService.findAByConditionWithRelations({ language: +id }, ['sentenceToSpeaker']);
  }


  // ==================================================================
  //              AUDIO
  // ==================================================================
  @Get('track/:audio_path')
  test(@Param('audio_path') audio_path, @Res() res) {
    // const imgPath = getImgPath(imgId);
    const filePath = 'lll';
    return res.sendFile(filePath, { root: 'public' });
  }
  @Post()
  create(@Body() sentence: SentenceEntity) {
    return this.sentenceService.create(sentence);
  }

  // ==================================================================
  //              AUDIO
  // ==================================================================

  @Post('upload_audio')
  @UseInterceptors(
    FileInterceptor('file', {
      storage
    })
  )
  async uploadFiles(@UploadedFile() file) {

    // 1. upload file, get filepath
    // 2. save to db
    // 3. return filepath
    const filepath = file.path;
    // todo make getUser decorator


    const filename = filepath.split('\\')[1];
    const filename_split = filename.split('-');
    const username = filename_split[0]

    //check if folder for the speaker exists, if not create and move file to that folder
    try {
      await this.createNewFolder(username)
    } catch (error) { console.log("error in creating folder :>>", error) }
    //upload file and move to speaker's folder
    try {
      const currentPath = path.join("uploads", file.originalname);
      const destinationPath = path.join("uploads/" + username, file.originalname);

      mv(currentPath, destinationPath, function (err) {
        if (err) {
          console.log("err in moving file :>>", err)
          throw err
        } else {
          console.log("Successfully moved the file!");
        }
        return;
      });
    } catch (error) {
      return this.sharedService.handleError(error)
    }

    // add to DB

    console.log('-----------------------------------------------------')
    console.log("adding to DB :>>")
    console.log('-----------------------------------------------------')






  }

  async createNewFolder(username: string) {
    const dir = 'uploads/' + username;

    if (!await fs.existsSync(dir)) {
      await fs.mkdirSync(dir, { recursive: true });
    }

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
