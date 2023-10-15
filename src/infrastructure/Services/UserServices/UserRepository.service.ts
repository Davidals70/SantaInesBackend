import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../db-entities/user.entity';
import { UserDto } from 'src/infrastructure/Dtos/User.dto';

@Injectable()
export class UserRepositoryService {
  constructor(
    @InjectRepository(UserEntity)
    private usuarioRepository: Repository<UserEntity>,
  ) {}

  async findAllUsers(): Promise<UserEntity[]> {
    return this.usuarioRepository.find();
  }

  async findByUsername(username: string): Promise<UserEntity | undefined> {
    return this.usuarioRepository.findOne({ where: { username: username } });
  }

  async create(user: UserDto): Promise<UserEntity> {
    return this.usuarioRepository.save(user);
  }

  async updateByUsername(username: string, userDto: UserDto): Promise<UserEntity | undefined> {
    const user = await this.findByUsername(username);
    if (!user) {
      return undefined; // User not found
    }

    Object.assign(user, userDto); // Update user entity with new data
    return this.usuarioRepository.save(user);
  }

  async deleteByUsername(username: string): Promise<boolean> {
    const userCheck: UserEntity = await this.findByUsername(username);
    
    if (!userCheck) {
      return false; // User not found
    }

    const user: UserEntity = await this.findByUsername(username);
    await this.usuarioRepository.delete(user.ID);
    return true;
  }
}
