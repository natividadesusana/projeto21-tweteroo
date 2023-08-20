import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/user.dtos';
import { CreateTweetDto } from './dtos/tweet.dtos';
import { TweetWithAvatar } from './entities/tweet.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  createUser(@Body() body: CreateUserDto) {
    return this.appService.createUser(body);
  }

  @Post('tweets')
  @HttpCode(HttpStatus.CREATED)
  createTweet(@Body() body: CreateTweetDto) {
    return this.appService.createTweet(body);
  }

  @Get('tweets')
  getTweets(@Query('page') page: number | null): TweetWithAvatar[]  {
    return this.appService.getTweets(page);
  }
}
