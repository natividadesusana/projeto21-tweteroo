import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';
import { CreateUserDto } from './dtos/user.dtos';

@Injectable()
export class AppService {
  private _users: User[];
  private _tweets: Tweet[];

  constructor() {
    this._users = [];
    this._tweets = [];
  }

  get users() {
    return this._users;
  }

  get tweets() {
    return this._tweets;
  }

  getHealth(): string {
    return "I'm okay!";
  }

  createUser(body: CreateUserDto) {
    const user = new User(body.username, body.avatar);
    return this.users.push(user);
  }
}
