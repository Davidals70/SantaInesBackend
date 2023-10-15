import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../db-entities/user.entity';
import { UserRepositoryService } from '../Services/UserServices/UserRepository.service';
import { UserController } from '../Controllers/User.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserRepositoryService],
  exports: [UserRepositoryService],
})
export class UserModule {}
