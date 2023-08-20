import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';
import { CreateUserDto } from './dtos/user.dtos';
import { CreateTweetDto } from './dtos/tweet.dtos';
import { TweetWithAvatar } from './entities/tweet.entity';

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

  getTweets(page: number | null): TweetWithAvatar[] {
    if (!page) {
      page = 1;
    }

    if (isNaN(page) || page < 1) {
      throw new BadRequestException('Please enter a valid page!');
    }

    const tweetsPerPage = 15;
    const startIndex = (page - 1) * tweetsPerPage;
    const endIndex = startIndex + tweetsPerPage;
    const latestTweets = this.tweets.slice(startIndex, endIndex);

    const tweetsWithAvatar = latestTweets.map((tweet) => {
      const tweetUser = this.users.find(
        (user) => user.username === tweet.username,
      );
      return new TweetWithAvatar(tweet.username, tweetUser.avatar, tweet.tweet);
    });

    return tweetsWithAvatar;
  }
}
