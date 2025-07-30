import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from 'src/modelsDto/user.modlels';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async getAll() {
    const data = await this.usersService.getAll();
    return data;
  }

  @Get(':id')
  async getUserByName(@Param('name') name: string) {
    const data = await this.usersService.getUserByName(name);
    return data;
  }

  @Post()
  async creatUser(@Body(ValidationPipe) body: UserDto) {
    const data = await this.usersService.createUser(body);
    return data;
  }

  @Put(':id')
  async updateUser(
    @Body(ValidationPipe) body: UserDto, @Param('id') id: string,) {
    const data = await this.usersService.updateUser(id, body);
    return data;
  }
}
