import { IsNotEmpty, IsString } from 'class-validator';

export class UserLogInDto {
  @IsString()
  @IsNotEmpty()
  public username: string;
  @IsString()
  @IsNotEmpty()
  public password: string;
}
