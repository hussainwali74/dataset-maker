import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res, HttpException, UseGuards, StreamableFile, Response } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SentenceEntity } from './entities/sentence.entity';
import { SentenceService } from './sentence.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage, storageCsv } from './storage.config';
import { Response as ExpressResponse } from "express";

import * as csv from 'fast-csv';
import { unlinkSync } from 'fs';

import { SharedService } from 'src/shared/shared.service';
import { SentenceToSpeakerEntity } from './entities/sentencetospeaker.entity';
import { SentenceToSpeakerService } from './sentencetospeacker.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { FileUploadDto } from './dto/file-upload.dto';
import { StreamableFileOptions } from '@nestjs/common/file-stream/streamable-options.interface';
import { promisify } from 'util';
import { checkIfFileOrDirectoryExists, createDirAsync } from 'src/storage.helper';

import path from 'path';
const mv = require('mv');
// import csv from 'csv-parser';
const fs = require('fs');
import { join } from 'path';

@UseGuards(JwtGuard)
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

  // @Roles(Role.EXPERT)
  // @UseGuards(JwtGuard, RolesGuard)
  @Get()
  async findAll() {

    let data;
    try {
      data = await this.sentenceService.findAll();
    } catch (error) {
      return this.sharedService.handleError(error)
    }
    return this.sharedService.handleSuccess(data)
  }

  // ------------------------------------------------------------------------------------
  //          EXPORT CSV AND AUDIO
  // ------------------------------------------------------------------------------------
  /**
   * 
   * @param res 
   * @returns CSV FILE of the sample sentences
   */
  @ApiTags('ds_maker')
  @Get('/exportcsv')
  async exportSampleSentencesCSV(@Response() res: ExpressResponse) {
    const data = await this.sentenceService.selectivefindByConditionWithRelations({ language: 1, sample: true }, [], ['id', 'sentence'])
    return await this.sentenceService.exportDataToCSV(data).then(
      async (filename) => {
        await this.sentenceService.getExportedCSV(filename).then((csvData) => {
          res.set('Content-Type', 'text/csv')
          return res.send(csvData)
        })
      }
    )

  }

  @ApiTags('ds_maker')
  @Get('/exportaudio')
  async exportSampleSentencesAudio(@Response() res: ExpressResponse) {
    const language_id = 1
    // const data = await this.sentenceService.findAByConditionWithRelations({ language: language_id, sample: true }, ['sentenceToSpeaker']);

    // http://localhost:5000/Burushaski/hussain/aa.wav

    /**
     * get list of Files in a directory:
     */
    const folederPath = join(process.cwd(), 'uploads', 'Burushaski', 'hussain\\')
    const filesArray = fs.readdirSync(folederPath).filter(file => fs.lstatSync(folederPath + file).isFile())



    const filePath = join(folederPath, 'a.wav');
    const stat = fs.statSync(filePath);
    // const fileExistsCheck = await checkIfFileOrDirectoryExists(filepath)

    // console.log('-----------------------------------------------------')
    // console.log("join(procces.cwd()) :>>", join(process.cwd(), 'uploads', 'Burushaski', 'hussain'))
    // console.log('-----------------------------------------------------')


    console.log('-----------------------------------------------------')
    console.log(`filePath`, filePath)
    console.log('-----------------------------------------------------')



    // console.log('-----------------------------------------------------')
    // console.log("fileExistsCheck :>>", fileExistsCheck)
    // console.log('-----------------------------------------------------')

    res.set('Content-Type', 'audio/wav')
    res.set('Content-Length', stat.size)
    // res.sendFile(filePath)
    // stream.on('end', function () {
    //   stream.close()
    //   console.log(`done sending file`);

    // })


    // console.log('-----------------------------------------------------')
    // console.log("res :>>", res)
    // console.log('-----------------------------------------------------')
    // res.send(file);

    const stream = fs.createReadStream(filePath)
    res.sendFile(stream)

  }

  // end export csv and audio ----------------------------------------------------------------------

  /**
   * 
   * @param id 
   * @returns one sentence find by id
   */
  @Get(':id')
  async findOne(@Param('id') id: string, @GetUser() user) {

    console.log('-----------------------------------------------------')
    console.log("user :>>", user)
    console.log('-----------------------------------------------------')


    let data;
    try {
      data = await this.sentenceService.findOne(+id);

    } catch (error) {
      return this.sharedService.handleError(error)
    }

    return this.sharedService.handleSuccess(data)
  }

  /**
   * 
   * @param id 
   * @returns list of all sentences by language id, with relation sentenceToSpeaker
   */
  @UseGuards(JwtGuard)
  @Get('language/:id')
  async getSentenceByLanguageId(@Param('id') id: number) {
    console.log(`langugage/id`);

    let data;

    try {
      data = await this.sentenceService.selectivefindByConditionWithRelations({ language: +id }, ['sentenceToSpeaker']);

    } catch (error) {
      return this.sharedService.handleError(error)
    }

    return this.sharedService.handleSuccess(data)
  }

  /**
   * 
   * @param id 
   * @param user user.id => speaker_id: from jwt 
   * @returns sample sentences of language by language id 
   */
  @Get('sample/language/:id')
  async getSampleSentencesByLanguageId(@Param('id') id: number, @GetUser() user) {
    let data;
    try {
      data = await this.sentenceService.findAByConditionWithRelationsOfUser({ language: +id, sample: true }, ['sentenceToSpeaker'], user.id);
    } catch (error) {
      return this.sharedService.handleError(error)
    }
    return this.sharedService.handleSuccess(data)
  }
  /**
   * 
   * @param id 
   * @param user user.id => speaker_id: from jwt 
   * @returns sample sentences of language by language id 
   */
  @Get('allsample/language/:id')
  async getAllSampleSentencesByLanguageId(@Param('id') id: number) {
    let data;
    try {
      data = await this.sentenceService.findAByConditionWithRelationsOfUser({ language: +id, sample: true }, ['sentenceToSpeaker']);
    } catch (error) {
      return this.sharedService.handleError(error)
    }
    return this.sharedService.handleSuccess(data)
  }

  /**
   * 
   * @param sentence 
   * @returns sentence search by sentence string
   */
  @Get('sentence/:sentence')
  async getSentenceBySentence(@Param('sentence') sentence: string) {
    let data;
    try {
      data = await this.sentenceService.findAByCondition({ sentence });

    } catch (error) {
      return this.sharedService.handleError(error)
    }
    return this.sharedService.handleSuccess(data)
  }


  // ==================================================================
  //              AUDIO
  // ==================================================================

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
    let filename;

    filename = filepath.split('\\')[1];
    if (!filename) {
      console.log("filename undefined:>>", filename)
      filename = filepath.split('/')[1]
    }

    //person_name-person_id-language_id-sentence_id-date-language_name
    const filename_split = filename.split('-');
    const username = filename_split[0]
    const sentence_id = filename_split[3]
    const languagename = filename_split[5].split('.')[0]

     //check if folder for the speaker exists, if not create and move file to that folder
    try {
      const ddd = await this.createNewFolder(languagename, username, sample)
    } catch (error) { console.log("error in creating folder :>>", error); return this.sharedService.handleError(error) }
    //upload file and move to speaker's folder

    try {
      const currentPath = join("uploads", file.originalname);
      const destPath = sample ? "uploads/" + languagename + "/sample" : "uploads/" + languagename + "/" + username;
      const destinationPath = join(destPath, file.originalname);

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

    console.log("adding to DB ")
    // add to DB
    if (sample) {
      try {
        let sentenceFromDb = await this.sentenceService.findOne(sentence_id);
        sentenceFromDb.audio = languagename + '/sample/' + file.originalname;
        delete sentenceFromDb.sentenceToSpeaker;
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
      sentenceToSpeaker.sentence = +filename_split[3];
      sentenceToSpeaker.speaker = +filename_split[1];

      // save middletable data
      try {
        let result;
        if (!update) {
          console.log("creating sentencetospeacker", sentenceToSpeaker)
          result = await this.sentenceToSpeakerService.create(sentenceToSpeaker);
        } else {
          console.log("update sentencetospeacker", sentenceToSpeaker)
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

      console.log('-----------------------------------------------------')
      console.log("dir in createNewFolder :>>", dir)
      console.log('-----------------------------------------------------')

    } else {
      dir = 'uploads/' + language + '/sample'
    }
    console.log(`dir in createNewFolder`, dir)
    try {
      await createDirAsync(dir)
    } catch (error) {

      console.log("error in createdirsync :>>", error)
      console.log('================================================')

      throw new HttpException(error, error.status)
    }

  }

  // ==================================================================
  //              CSV
  // ==================================================================

  @Post('/upload_csv/:language_id')
  @UseInterceptors(
    FileInterceptor('file', {
      // dest: './uploads'
      storage: storageCsv

    })
  )
  async uploadCSVFiles(@UploadedFile() file, @Param('language_id') language_id: number) {
    try {
      await this.handleCSV(file, false, language_id);
    } catch (error) {
      return this.sharedService.handleError(error)
    }
    return this.sharedService.handleSuccess("Upload complete")
  }

  @Post('/upload_csv_sample/:language_id')
  @UseInterceptors(
    FileInterceptor('file', {
      // dest: './uploads'
      storage: storageCsv

    })
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'csv of sample sentences',
    type: FileUploadDto,
  })
  @ApiOperation({ summary: "upload sample csv for the language language_id" })
  async uploadSampleCSVFiles(@UploadedFile() file, @Param('language_id') language_id: number) {
    try {
      const data = await this.handleCSV(file, true, language_id);
      return data;
    } catch (error) {
      return this.sharedService.handleError(error)
    }
  }

  async handleCSV(file, sample: boolean, language: number) {
    console.log(`file`, file)
    const filepath = file.path;
    //parse csv
    try {
      var resultData: any[] = [];
      await fs.createReadStream(filepath)
        .pipe(csv.parse({ headers: ['sentence'] }))
        .on('error', error => console.log(`error`, error))
        .on('data', (row) => {
          if (sample)
            row['sample'] = true;
          row['language'] = +language;
          resultData.push(row)
        })
        .on('end', async (data, rowCount: number) => {

          await this.sentenceService.createMany(resultData)
          // console.log(`data`, resultData)
        })

    } catch (error) {
      throw new HttpException(error, error.statusy)
    }

    await this.deleteFile(filepath);

  }

  async deleteFile(filepath) {
    //delete file
    try {
      // const data = unlink(filepath).then(data => {
      //   return data
      // },
      //   (error) => { throw error })
      // console.log("successfully deleted file ", filepath)
      const data = unlinkSync(filepath)
      return data;
    } catch (error) {

      console.log('================================================')
      console.log("error :>>", error)
      console.log('================================================')

      throw new HttpException(error, error.status)
    }
  }

  @Patch('/delete_recording/:language_name/:sample')
  async deleteSentence(
    @Param('language_name') language_name: string,
    @Param('sample') sample,
    @Body() sentence: SentenceEntity,
    @GetUser() user
  ) {
    //delete file and delete entry from intermediate table

    if (sample === 'true' && sentence.audio) {
      const filepath = join(__dirname, '../../', '/uploads/' + sentence.audio);
      try {
        const result = await this.handleDeleteRecording(filepath, sentence, true)
        return this.sharedService.handleSuccess(result)
      } catch (error) {
        return this.sharedService.handleError(error)
      }

    } else {
      const filepath = join(__dirname, '../../', '/uploads/' + language_name + '/' + user.name + '/' + sentence['recordedAudio'].audio_url);
      try {
        const result = await this.handleDeleteRecording(filepath, sentence, false)
        return this.sharedService.handleSuccess(result)
      } catch (error) {
        return this.sharedService.handleError(error)
      }
    }
  }

  async handleDeleteRecording(filepath, sentence: SentenceEntity, sample) {
    try {
      const resultOfDeleteFile = await this.deleteFile(filepath)
      // return this.sharedService.handleSuccess(result)
    } catch (error) {
      console.log(`error in deletefile 387`, error)
      // return this.sharedService.handleError(error)
    }

    try {
      if (sample && sentence.audio) {
        const result = await this.sentenceService.update(sentence.id, { audio: null })
        return this.sharedService.handleSuccess(result)
      } else {
        const result = await this.sentenceService.deleteRecordedFileFromMidTable(sentence['recordedAudio']['id'])
        return this.sharedService.handleSuccess(result)
      }
    } catch (error) {
      console.log(`error in updateafterdelete sample sentence audio: 406: `, error)
      throw error;
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() sentence: SentenceEntity) {

    try {
      const data = await this.sentenceService.update(+id, sentence);
      return this.sharedService.handleSuccess(data)
    } catch (error) {
      return this.sharedService.handleError(error)
    }

  }
  // ==================================================================
  //              delete requests
  // ==================================================================

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.sentenceService.remove(+id);
  }

  // @Delete()
  // async removeaLL() {
  //   return await this.sentenceService.removeAll();
  // }

}
