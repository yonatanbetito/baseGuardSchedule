import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserDBService } from 'src/db/dbConect';

@Module({
  controllers: [UsersController],
  providers: [UsersService,UserDBService],
  exports: [UsersService],
})
export class UsersModule {}
