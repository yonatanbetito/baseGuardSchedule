import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}
  //check user name/password
  async validateUser(name: string, password: string) {
    const user = await this.userService.getUserByName(name);
    if (!user) throw new UnauthorizedException('user not found');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('worng password');
    return user;
  }

  //enter to payload
  async login(user: any) {
    const payload = {
      id: user.id,
      name: user.name,
      role: user.role,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
