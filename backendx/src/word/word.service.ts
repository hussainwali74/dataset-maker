import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WordEntity } from './entities/word.entity';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(WordEntity)
    private wordRepository: Repository<WordEntity>
  ) { }

  async findAll() {

    try {
      return await this.wordRepository.find();
    } catch (error) {
      throw new HttpException(error, error.status)
    }

  }

  async findOne(id: number) {

    try {
      return await this.wordRepository.findOne(id);
    } catch (error) {
      throw new HttpException(error, error.status)
    }

  }

  async create(word: WordEntity) {

    try {
      const data = await this.wordRepository.create(word)
      return await this.wordRepository.save(data);
    } catch (error) {
      throw new HttpException(error, error.status)
    }

  }

  async update(id: number, word: WordEntity) {

    try {
      return await this.wordRepository.update(id, word);
    } catch (error) {
      throw new HttpException(error, error.status)
    }

  }

  async remove(id: number) {

    try {
      const data = await this.wordRepository.findOne(id)
      return await this.wordRepository.remove(data);

    } catch (error) {
      throw new HttpException(error, error.status)
    }
  }

}
