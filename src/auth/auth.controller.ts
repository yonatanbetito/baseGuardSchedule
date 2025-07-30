import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UserDto } from '../modelsDto/user.modlels';
import * as bcrypt from 'bcrypt';

//auth endpoints
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  // Login endpoint
  @Post('login')
  async login(@Body() body: { name: string; password: string }) {
    // Validate user credentials and return JWT token
    const user = await this.authService.validateUser(body.name, body.password);
    return this.authService.login(user);
  }

  // Register endpoint
  @Post('register')
  async register(@Body() body: UserDto) {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const userToSave = { ...body, password: hashedPassword };
    const user = await this.usersService.createUser(userToSave);
    return { message: 'User registered successfully', user };
  }
}
