## Sigmo - Venmo <3 Signal

This is a simple Node.JS app that listens for SMS's on Twilio and
responds by giving the sender a $1.00 gift.

### Setup

These instructions have only been tested on OS X and Linux and assumes
you have Node.JS installed. YMMV for
Windows users

#### Redis

This app uses Redis to make sure duplicate gifts are not being sent and
also to limit the total number of gifts being sent. Install
[Redis](http://redis.io) and start it by running `redis-server`.

### App Instructions

0. Run `npm install`
1. `cp .env-example .env`
2. Change all the credentials in the `.env` file with actual Twilio and
   Venmo credentials
3. Install `ngrok` from [ngrok.com](https://ngrok.com)
4. Start the server using the command `./script/server`
5. If all goes well you should see an output which says `Started Sigmo`
6. In a separate window, run `ngrok 3000`. This opens up a reverse
   tunnel to your server that is publicly accessible on the Internet.
7. Copy the `https` URL from ngrok and paste the URL of your server
   into the "SMS" URL of a number on the [Numbers
page](https://www.twilio.com/user/account/phone-numbers/incoming) of your Twilio
Account. On the page for that number, change the Method from "POST" to
"GET".

You're done!

### Deploying to Heroku

1. Create a Heroku app within this directory using `heroku create` Copy the URL of your app and paste the URL of your server into the "SMS" URL of a number on the [Numbers
page](https://www.twilio.com/user/account/phone-numbers/incoming) of your Twilio
Account. On the page for that number, change the Method from "POST" to
"GET".
2. Run `git push heroku master`
3. Run `heroku scale web=1`
4. Run `heroku addons:create redistogo`
5. Set the `VENMO_ACCESS_TOKEN` environment variable with your access
   token using `heroku config:set
VENMO_ACCESS_TOKEN=your-venmo-access-token`
6. Set the gift limit using `heroku config:set GIFT_LIMIT=100`

### Credits

This app was built by [Justin Woo](https://twitter.com/jzwoo) and [Arun
Thampi](https://twitter.com/iamclovin)
