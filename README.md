## Sigmo - Venmo <3 Signal

This is a simple Node.JS app that listens for SMS's on Twilio and
responds by giving the sender a $1.00 gift.

### Setup

These instructions have only been tested on OS X and Linux and assumes
you have Node.JS installed. YMMV for
Windows users

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
   into the "SMS" URL of a number on the Numbers page of your Twilio
Account. On the page for that number, change the Method from "POST" to
"GET".

You're done!
