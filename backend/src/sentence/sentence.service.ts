import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, IsNull, Repository, Connection } from 'typeorm';
import { SentenceEntity } from './entities/sentence.entity';

@Injectable()
export class SentenceService {
  constructor(
    private connection: Connection,
    @InjectRepository(SentenceEntity)
    private sentenceRespository: Repository<SentenceEntity>
  ) { }

  async findAll() {

    try {
      return await this.sentenceRespository.find();
    } catch (error) {
      throw new HttpException(error, error.status)
    }

  }

  async findAByConditionWithRelationsOfUser(condition, relations, speaker_id) {

    try {

      let data: SentenceEntity[] = await this.sentenceRespository.find({ where: condition, relations: relations });

      data = data.map(sentence => {
        for (let i = 0; i < sentence.sentenceToSpeaker?.length; i++) {
          let element = sentence.sentenceToSpeaker[i];
          const splitelement = element.audio_url.split('-');
          //person_name-person_id-language_id-sentence_id-date-language_name
          element['sentence'] = +splitelement[3];
          element['speaker'] = +splitelement[1];

          if (element.speaker == speaker_id) {
            sentence['recordedAudio'] = element
          };
        }
        delete sentence.sentenceToSpeaker;
        return sentence;
      })

      return data;
    } catch (error) {
      throw new HttpException(error, error.status)
    }

  }

  async findAByConditionWithRelations(condition, relations) {

    try {
      return await this.sentenceRespository.find({ where: condition, relations: relations });
    } catch (error) {
      throw new HttpException(error, error.status)
    }

  }

  async findAByCondition(condition) {

    try {
      return await this.sentenceRespository.find({ where: condition });
    } catch (error) {
      throw new HttpException(error, error.status)
    }

  }

  async findOneByCondition(condition) {
    try {
      return await this.sentenceRespository.findOne({ where: condition });
    } catch (error) {
      throw new HttpException(error, error.status)
    }
  }

  async findOne(id: number) {

    try {
      return await this.sentenceRespository.findOne(id);
    } catch (error) {
      throw new HttpException(error, error.status)
    }

  }

  async create(sentence: SentenceEntity) {

    try {
      const existing = await this.findOneByCondition({ sentence: sentence.sentence })
      if (existing) throw new HttpException('sentence Already exists', HttpStatus.NOT_IMPLEMENTED)
      const data = await this.sentenceRespository.create(sentence)
      return await this.sentenceRespository.save(data);
    } catch (error) {
      throw new HttpException(error, error.status)
    }

  }

  async createMany(sentences: SentenceEntity[]) {

    console.log(`sentences.length`, sentences.length)
    let finalSentences = [];
    for (let i = 0; i < sentences.length; i++) {
      const element = sentences[i].sentence;

      const data = await this.findOneByCondition({ sentence: element })
      if (data) {
        if (sentences[i]['sample'] && !data.sample) {
          console.log(`updating `, i)
          try {
            await this.update(data.id, { sample: true })
          } catch (error) {

            console.log('================================================')
            console.log("error in  updating  :>>" + data.id, error)
            console.log('================================================')

          }
        }
      }
      if (!data) {

        console.log('================================================')
        console.log("data not  :>>", sentences[i])
        console.log('================================================')

        finalSentences.push(sentences[i])
      }
    }

    console.log(`final Sentences.length`, finalSentences.length)

    try {
      if (finalSentences.length) {


        console.log('================================================')
        console.log('CREATINGSENTENCES')
        console.log(`findalSenteces.length`, finalSentences.length)
        console.log('================================================')

        // const data = await this.sentenceRespository.create(finalSentences)
        return await this.sentenceRespository.save(finalSentences);
      } return "all sentences already added"
    } catch (error) {
      throw new HttpException(error, error.status)
    }

  }

  async update(id: number, sentence: SentenceEntity) {

    try {
      return await this.sentenceRespository.update(id, sentence);
    } catch (error) {
      throw new HttpException(error, error.status)
    }

  }

  async remove(id: number) {

    try {
      const data = await this.sentenceRespository.findOne(id)
      return await this.sentenceRespository.remove(data);

    } catch (error) {
      throw new HttpException(error, error.status)
    }
  }

  async removeAll() {

    try {
      return await this.sentenceRespository.delete({ "created_at": Not(IsNull()) })

    } catch (error) {
      throw new HttpException(error, error.status)
    }
  }

}
