var express = require('express');
var request = require('request');

var app = express();

var accountSid = process.env['TWILIO_ACCOUNT_SID']
var authToken = process.env['TWILIO_AUTH_TOKEN']

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

app.get('/sigmo', function(req, res) {
  fromNumber = req.query['From'];

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
      res.send("There was an error sending the money to " + fromNumber);
    } else {
      console.log(response.statusCode, body);
      res.send("Hello World");
    }
	});
});

var server = app.listen(3000, function () {
	console.log("started Sigmo");
});
