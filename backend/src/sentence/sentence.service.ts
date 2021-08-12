import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SentenceEntity } from './entities/sentence.entity';

@Injectable()
export class SentenceService {
  constructor(
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
  async findAByConditionWithRelations(condition, relations) {

    try {
      return await this.sentenceRespository.find({ where: condition, relations: relations });
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

  async create(word: SentenceEntity) {

    try {
      const data = await this.sentenceRespository.create(word)
      return await this.sentenceRespository.save(data);
    } catch (error) {
      throw new HttpException(error, error.status)
    }

  }

  async update(id: number, word: SentenceEntity) {

    try {
      return await this.sentenceRespository.update(id, word);
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

}
