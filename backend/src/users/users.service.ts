import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity)
  private userRepository: Repository<UserEntity>
  ) { }
  async create(user: UserEntity) {
    try {
      const data = await this.userRepository.create(user)

      return await this.userRepository.save(data);
    } catch (error) {

      throw new HttpException(error, HttpStatus.NOT_IMPLEMENTED)
    }
  }

  async findByPayload(payload: any) {
    const { email } = payload;
    return await this.findOneByOptions({ where: { email } })
  }

  async findAll() {

    try {
      return await this.userRepository.find()
    } catch (error) {
      throw new HttpException(error, error.status)
    }

  }

  async findOne(id: number) {

    try {
      return await this.userRepository.findOne(id)
    } catch (error) {
      throw new HttpException(error, error.status)
    }
  }

  async findByOptions(options) {

    try {
      return await this.userRepository.find(options)
    } catch (error) {
      throw new HttpException(error, error.status)
    }

  }

  async findOneByOptions(options) {

    try {
      return await this.userRepository.findOne(options)
    } catch (error) {
      throw new HttpException(error, error.status)
    }

  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
