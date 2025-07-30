import { IsEmail, IsString, IsNotEmpty, IsEnum } from 'class-validator';
export class UserDto {
  id: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(['solder', 'commnder'], {
    message: 'valid role required',
  })
  role: 'solder' | 'commnder';
}
