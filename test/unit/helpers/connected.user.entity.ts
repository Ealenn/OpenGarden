import { Types } from 'mongoose';
import { User } from 'src/users/models/user.entity';

export const testingConnectedUser: User = {
  _id: new Types.ObjectId(),
  email: 'example@domain.com',
  password: '123456789',
  username: 'testUser',
};
