import { IsNotEmpty, IsString } from 'class-validator';

export class UserInfoDto {
  @IsString()
  @IsNotEmpty()
  public username: string;
  @IsString()
  @IsNotEmpty()
  public user_type: string;
}
