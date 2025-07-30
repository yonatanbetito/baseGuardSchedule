import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class ApiTokenCheck implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.authorization;
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    try {
      if (!process.env.SECRET_KEY) {
        return res.status(500).json({ message: 'No Secret key' });
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
      (req as any).user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}
