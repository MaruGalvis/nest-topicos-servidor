import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './entities/auth.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private authModel: Model<AuthDocument>, private jwtSvc: JwtService) {}

  async create(createAuthDto: CreateAuthDto): Promise<Auth> {
    try {
      const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
      const createdAuth = new this.authModel({
        ...createAuthDto,
        password: hashedPassword,
      });
      return await createdAuth.save();
    } catch (error) {
      throw new HttpException('Please check your credentials', HttpStatus.UNAUTHORIZED); 
    }
  }

  async login(email: string, password: string) {
    try {
      const auth = await this.authModel.findOne({ email });
      if (!auth) {
        throw new HttpException('Please check your credentials', HttpStatus.UNAUTHORIZED);
      }
      const isPasswordValid = await bcrypt.compare(password, auth.password);
      
      if (!isPasswordValid) {
        throw new HttpException('Please check your credentials', HttpStatus.UNAUTHORIZED);
      }
      if (auth && isPasswordValid) {
        const payload = { email: auth.email, sub: auth._id };
        const token = await this.jwtSvc.signAsync(payload);
        return { 
          access_token: token,
        };      
      }
    } catch (error) {
      throw new HttpException('Please check your credentials', HttpStatus.UNAUTHORIZED);
    }
  }
}