import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';
import { CreateUserDto } from './dtos/user.dtos';
import { CreateTweetDto } from './dtos/tweet.dtos';

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

  createTweet(body: CreateTweetDto) {
    const { username, tweet } = body;

    const tweetUser = this.users.find((user) => user.username === username);
    if (!tweetUser) {
      throw new UnauthorizedException('Username has not previously sign-up');
    }

    const newTweet = new Tweet(username, tweet);
    return this.tweets.push(newTweet);
  }
}
