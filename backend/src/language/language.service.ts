import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LanguageEntity } from './entities/language.entity';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(LanguageEntity)
    private languageRepository: Repository<LanguageEntity>
  ) { }

  async findAll() {

    try {
      return await this.languageRepository.find();
    } catch (error) {
      throw new HttpException(error, error.status)
    }

  }

  async findOne(id: number) {

    try {
      return await this.languageRepository.findOne(id);
    } catch (error) {
      throw new HttpException(error, error.status)
    }

  }

  async create(language: LanguageEntity) {

    try {
      const data = await this.languageRepository.create(language)
      return await this.languageRepository.save(data);
    } catch (error) {
      throw new HttpException(error, error.status)
    }

  }

  async update(id: number, language: LanguageEntity) {

    try {
      return await this.languageRepository.update(id, language);
    } catch (error) {
      throw new HttpException(error, error.status)
    }

  }

  async remove(id: number) {

    try {
      const data = await this.languageRepository.findOne(id)
      return await this.languageRepository.remove(data);

    } catch (error) {
      throw new HttpException(error, error.status)
    }
  }

}
