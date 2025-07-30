import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/modelsDto/user.modlels';
import { UserDBService } from 'src/db/dbConect';

@Injectable()
export class UsersService {
  constructor(private readonly userDBService: UserDBService) {}

  async getAll() {
    const pool = this.userDBService.getPool();
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM users');
      client.release();
      return result.rows;
    } catch (error) {
      client.release();
      throw error;
    }
  }

  async getUserByName(name: string) {
    const pool = this.userDBService.getPool();
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM users WHERE name = $1', [
        name,
      ]);
      client.release();
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async createUser(body: UserDto) {
    const pool = this.userDBService.getPool();
    const client = await pool.connect();
    try {
      const { name, email, password, role } = body;
      const result = await client.query(
        'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, email, password, role],
      );
      client.release();
      return result.rows[0];
    } catch (error) {
      client.release();
      throw error;
    }
  }

  async updateUser(id: string, body: UserDto) {
    const pool = this.userDBService.getPool();
    const client = await pool.connect();
    try {
      const { name, email, password, role } = body;
      const result = await client.query(
        'UPDATE users SET name = $1, email = $2, password = $3, role = $4 WHERE id = $5 RETURNING *',
        [name, email, password, role, id],
      );
      client.release();
      if (result.rows.length === 0) {
        throw new Error('User not found');
      }
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // async function deleteUser(id:string) {}
}
