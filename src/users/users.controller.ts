import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from 'src/models/user.modlels';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}
 

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const data = await this.usersService.getUserById(id);
    return data;
  }

  @Post()
  async creatUser(@Body('body') body: UserDto) {
    const data = await this.usersService.creatUser(body);
    return data;
  }
}
