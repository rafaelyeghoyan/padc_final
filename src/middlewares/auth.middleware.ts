import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as process from 'process';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    console.log('authHeader',authHeader)

    if (!authHeader) {
      throw new HttpException(
        'Authorization header is missing',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = authHeader.split(' ')[1];

    console.log('token',token)
    if (!token) {
      throw new HttpException('Token is missing', HttpStatus.UNAUTHORIZED);
    }

    try {
      console.log('SECRET_KEY',process.env.SECRET_KEY);

      const decodeUser = jwt.verify(token, process.env.SECRET_KEY);
      console.log('decodeUser',decodeUser);
      req['user'] = decodeUser;
      next();
    } catch (error) {
      console.log(error)
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
