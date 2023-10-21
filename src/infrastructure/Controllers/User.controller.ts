import { Controller, Get, Post, Delete, Put, Body, Param, ConflictException } from '@nestjs/common';
import { UserRepositoryService } from '../Services/UserServices/UserRepository.service';
import { UserEntity } from '../db-entities/user.entity';
import { UserDto } from '../Dtos/User.dto';
import { UserLogInDto } from '../Dtos/UserLogInDto.dto';
import { UserInfoDto } from '../Dtos/UserInfo.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserRepositoryService) {}

  @Get('all') //For Dev
  async getByUsername(): Promise<UserEntity[]> {
    return await this.userService.findAllUsers();
  }

  @Get('info/:username')
  async info(@Param('username') username: string): Promise<UserInfoDto>{
    const userEntity: UserEntity = await this.userService.findByUsername(username);
    const userInfoDto: UserInfoDto = new UserInfoDto();
    userInfoDto.username = userEntity.username;
    userInfoDto.user_type = userEntity.user_type;
    return userInfoDto;
  }

  @Post('login')
  async logIn(@Body() UserLogInDto: UserLogInDto): Promise<Object> {
    const user = await this.userService.findByUsername(UserLogInDto.username);
    if (!user){
      return {
        message: "User not found",
        value: false
      }
    }
    if (user.password === UserLogInDto.password){
      return {
        message: "Succesful",
        value: true
      }
    }
    else{
      return {
        message: "Wrong password",
        value: false
      }
    }
  }

  @Post('create')
  async create(@Body() userData: UserDto): Promise<UserEntity> {
    try {
        return await this.userService.create(userData);
      } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
          throw new ConflictException('Username already in use.');
        }
        throw error;
      }
  }

  @Put('update/:username') // Use PUT method for updating
  async update(@Body() userDto: UserDto, @Param('username') username: string): Promise<UserEntity | undefined> {
    return await this.userService.updateByUsername(username, userDto);
  }

  @Delete('delete/:username')
  async delete(@Param('username') username: string): Promise<Object> {
    if(await this.userService.deleteByUsername(username)){
      return {
        message: "User deleted",
        value: true
      }
    }
    else{
      return {
        message: "User not found",
        value: false
      }
    }
  }
}
