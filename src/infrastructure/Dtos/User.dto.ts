import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  public username: string;
  @IsString()
  @IsNotEmpty()
  public password: string;
  @IsString()
  @IsNotEmpty()
  public user_type: string;
}
