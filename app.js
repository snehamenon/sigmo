var express = require('express');
var request = require('request');
var redis = require("redis");
var redisClient = null;

if (process.env.REDISTOGO_URL) {
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  redisClient = redis.createClient(rtg.port, rtg.hostname);
  redisClient.auth(rtg.auth.split(":")[1]);
} else {
  redisClient = redis.createClient();
}

var app = express();
var redisKey = 'SIGMO';

app.get('/sigmo', function(req, res) {
  fromNumber = req.query['From'];

  redisClient.hlen(redisKey, function(err, length) {
    if(length < process.env.GIFT_LIMIT) {
      if(fromNumber != "") {
        redisClient.hget(redisKey, fromNumber, function(err, reply) {
          if(reply == 'true') {
            errorMessage = "You have already requested your gift, thanks for trying!";
            console.log(errorMessage)
            res.status(500).send(errorMessage);
          } else {
            redisClient.hset(redisKey, fromNumber, 'true');

            request({
              url: 'https://api.venmo.com/v1/payments',
              qs: {
                phone: fromNumber,
                access_token: process.env['VENMO_ACCESS_TOKEN'],
                amount: '1.00',
                note: 'Thank you for using Venmo',
              },
              method: 'POST',
            }, function(error, response, body){
              if(error) {
                console.log(error);
                res.status(500).send("There was an error sending the money to " + fromNumber);
              } else {
                console.log(response.statusCode, body);
                res.status(200).send("Thanks for trying out Sigmo!");
              }
            });
          }
        });
      }
    } else {
      errorMessage = "Gift Period is Done";
      console.log(errorMessage)
      res.status(500).send(errorMessage);
    }
  });
});

app.set('port', (process.env.PORT || 3000));

var server = app.listen(app.get('port'), function () {
  console.log("started Sigmo");
});
