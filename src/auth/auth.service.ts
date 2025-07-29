import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET = '';

@Injectable()
export class AuthService {
  generateToken(payload: any): string {
    return sign(payload, JWT_SECRET, { expiresIn: '1h' });
  }

  verifyToken(token: string): any {
    try {
      return verify(token, JWT_SECRET);
    } catch (e) {
      return null;
    }
  }
}
