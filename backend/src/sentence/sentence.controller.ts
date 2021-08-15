import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SentenceEntity } from './entities/sentence.entity';
import { SentenceService } from './sentence.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage, storageCsv } from './storage.config';
const mv = require('mv');
const path = require("path")
// import csv from 'csv-parser';


import * as csv from 'fast-csv';
const fs = require('fs');
import { unlink } from 'fs/promises';
import { SharedService } from 'src/shared/shared.service';
import { SentenceToSpeakerEntity } from './entities/sentencetospeaker.entity';
import { SentenceToSpeakerService } from './sentencetospeacker.service';

@ApiUnauthorizedResponse({ description: 'please provide a valid token' })
@ApiBearerAuth('token')
@ApiTags('Sentences')
@Controller('sentence')
export class SentenceController {

  constructor(
    private readonly sentenceService: SentenceService,
    private sharedService: SharedService,
    private sentenceToSpeakerService: SentenceToSpeakerService,
  ) { }

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

  @Post('upload_audio_sample')
  @UseInterceptors(
    FileInterceptor('file', {
      storage
    })
  )
  async uploadSampleFiles(@UploadedFile() file) {
    try {
      const result = await this.handFileUploadAndDb(file, true)
      return this.sharedService.handleSuccess(result)
    } catch (error) {
      return this.sharedService.handleError(error)
    }

  }
  @Post('upload_audio')
  @UseInterceptors(
    FileInterceptor('file', {
      storage
    })
  )
  async uploadFiles(@UploadedFile() file) {
    try {
      const result = await this.handFileUploadAndDb(file, false)
      return this.sharedService.handleSuccess(result)
    } catch (error) {
      return this.sharedService.handleError(error)
    }

  }

  async handFileUploadAndDb(file, sample: boolean = false) {

    // 1. upload file, get filepath
    // 2. save to db
    // 3. return filepath
    const filepath = file.path;
    // todo make getUser decorator

    const filename = filepath.split('\\')[1];
    //person_name-person_id-language_id-sentence_id-date-language_name
    const filename_split = filename.split('-');
    const username = filename_split[0]
    const sentence_id = filename_split[3]
    const languagename = filename_split[5].split('.')[0]

    //check if folder for the speaker exists, if not create and move file to that folder
    try {
      await this.createNewFolder(languagename, username, sample)
    } catch (error) { console.log("error in creating folder :>>", error); return this.sharedService.handleError(error) }
    //upload file and move to speaker's folder

    try {
      const currentPath = path.join("uploads", file.originalname);
      const destPath = sample ? "uploads/" + languagename + "/sample" : "uploads/" + languagename + "/" + username;
      const destinationPath = path.join(destPath, file.originalname);

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
      throw new HttpException(error, error.status)
    }

    // add to DB
    if (sample) {
      try {
        let sentenceFromDb = await this.sentenceService.findOne(sentence_id);
        sentenceFromDb.audio = languagename + '/sample/' + file.originalname;
        await this.sentenceService.update(sentence_id, sentenceFromDb);
      } catch (error) {
        throw new HttpException(error, error.status)
      }
    } else {

      let sentenceToSpeaker: SentenceToSpeakerEntity;
      try {
        sentenceToSpeaker = await this.sentenceToSpeakerService.findOneByCondition({ sentence: filename_split[3], speaker: filename_split[1] })

      } catch (error) {
        throw new HttpException(error, error.status)
      }

      let update = true;
      if (!sentenceToSpeaker) {
        update = false;
        sentenceToSpeaker = new SentenceToSpeakerEntity()
      }
      sentenceToSpeaker.audio_url = file.originalname;
      sentenceToSpeaker.sentence = filename_split[3];
      sentenceToSpeaker.speaker = filename_split[1];

      // save middletable data
      try {
        let result;
        if (!update) {
          console.log("creating")
          result = await this.sentenceToSpeakerService.create(sentenceToSpeaker);
        } else {
          result = await this.sentenceToSpeakerService.update(sentenceToSpeaker.id, sentenceToSpeaker);
        }
        return result

      } catch (error) {
        console.log("error in create or update sentencetospeacker", error)
        throw new HttpException(error, error.status)
      }
    }
  }

  async createNewFolder(language: string, username: string, sample: boolean = false) {
    let dir;
    if (!sample) {
      dir = 'uploads/' + language + '/' + username;
    } else {
      dir = 'uploads/' + language + '/sample'
    }

    try {
      const direxists = await fs.existsSync(dir)
      if (!direxists) {
        await fs.mkdirSync(dir, { recursive: true });
      }
    } catch (error) {
      throw new HttpException(error, error.status)
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
    try {
      await this.handleCSV(file);
    } catch (error) {
      return this.sharedService.handleError(error)
    }
    return this.sharedService.handleSuccess("Upload complete")
  }

  async handleCSV(file) {
    console.log(`file`, file)
    const filepath = file.path;
    //parse csv
    try {


      var resultData: any[] = [];
      await fs.createReadStream(filepath)
        .pipe(csv.parse({ headers: ['sentence'] }))
        .on('error', error => console.log(`error`, error))
        .on('data', (row) => {
          resultData.push(row)
        })
        .on('end', async (data, rowCount: number) => {
          await this.sentenceService.createMany(resultData)
          console.log(`data`, resultData)
        })

      console.log('================================================')
      console.log("resultData :>>", resultData)
      console.log('================================================')
    } catch (error) {
      throw new HttpException(error, error.statusy)
    }
    //delete file
    try {
      await unlink(filepath)
      console.log("successfully deleted file ", filepath)
    } catch (error) {
      throw new HttpException(error, error.status)
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
