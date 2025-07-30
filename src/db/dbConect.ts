import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class UserDBService {
  private pool: Pool;

  constructor() {
    const dbUrl = process.env.DB_URL;
    if (!dbUrl) {
      throw new Error('DB_URL not defined');
    }
    this.pool = new Pool({ connectionString: dbUrl });
  }

  getPool(): Pool {
    return this.pool;
  }
}
