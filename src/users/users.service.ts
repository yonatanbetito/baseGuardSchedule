import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/models/user.modlels';

@Injectable()
export class UsersService {
  users: UserDto[] = [];
  constructor() {
    let user1: UserDto = new UserDto();
    user1.id = '1';
    user1.name = 'yonatan';
    user1.email = 'yoni@gmail.com';
    user1.password = '2580';

    let user2: UserDto = new UserDto();
    user2.id = '2';
    user2.name = 'roni';
    user2.email = 'roni@gmail.com';
    user2.password = '0000';

    let user3: UserDto = new UserDto();
    user3.id = '3';
    user3.name = 'anaelle';
    user3.email = 'ana@gmail.com';
    user3.password = '1111';

    this.users.push(user1);
    this.users.push(user2);
    this.users.push(user3);
  }

  async getAll() {
    console.log('getAll actived');
    return this.users;
  }

  async getUserById(id: string) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  async creatUser(body: UserDto) {
    try {
      const { id, name, email, password, role } = body;
    } catch (error) {
      console.log(error);
    }
    return `user ${name} created`;
  }
}
