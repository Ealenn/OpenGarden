import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './Models/user';
import { InjectModel } from '@nestjs/mongoose';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: User): Promise<User> {
    try {
      await this.userModel.create(user);
    } catch (exception) {
      if (exception.code === 11000) {
        throw new ConflictException();
      }
      throw exception;
    }
    return await this.findOneByEmail(user.email);
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.userModel.findOne({ email });
  }

  async findOneById(id: string): Promise<User | undefined> {
    return await this.userModel.findOne({ id });
  }
}
