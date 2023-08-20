export class Tweet {
  private _username: string;
  private _tweet: string;

  constructor(username: string, tweet: string) {
    this._username = username;
    this._tweet = tweet;
  }

  get username() {
    return this._username;
  }

  get tweet() {
    return this._tweet;
  }
}

export class TweetWithAvatar {
  private username: string;
  private avatar: string;
  private tweet: string;

  constructor(username: string, avatar: string, tweet: string) {
    this.username = username;
    this.avatar = avatar;
    this.tweet = tweet;
  }
}
