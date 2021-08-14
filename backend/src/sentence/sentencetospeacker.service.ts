import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SentenceToSpeakerEntity } from './entities/sentencetospeaker.entity';

@Injectable()
export class SentenceToSpeakerService {

  constructor(
    @InjectRepository(SentenceToSpeakerEntity)
    private sentenceToSpeakerRepository: Repository<SentenceToSpeakerEntity>
  ) { }

  async findAll() {

    try {
      return await this.sentenceToSpeakerRepository.find();
    } catch (error) {
      throw new HttpException(error, error.status)
    }

  }

  async findOne(id: number) {

    try {
      return await this.sentenceToSpeakerRepository.findOne(id);
    } catch (error) {
      throw new HttpException(error, error.status)
    }

  }

  async create(word: SentenceToSpeakerEntity) {

    try {
      const data = await this.sentenceToSpeakerRepository.create(word)
      return await this.sentenceToSpeakerRepository.save(data);
    } catch (error) {
      throw new HttpException(error, error.status)
    }

  }

  async update(id: number, word: SentenceToSpeakerEntity) {

    try {
      return await this.sentenceToSpeakerRepository.update(id, word);
    } catch (error) {
      throw new HttpException(error, error.status)
    }

  }

  async remove(id: number) {

    try {
      const data = await this.sentenceToSpeakerRepository.findOne(id)
      return await this.sentenceToSpeakerRepository.remove(data);

    } catch (error) {
      throw new HttpException(error, error.status)
    }
  }

}