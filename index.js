var express = require('express');
var app = express();



app.get('/', function(request, response) {
    response.send("<h1>this is the homepage</h1>");
  });

app.get('/hello', function (request, response) {
  
  if (request.query.name) {
      response.send('<h1>Hello</h1>' + request.query.name);
  }
  else {
      response.send('<h1>Hello World!</h1>'); 
  }
  
});





/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  console.log('Example app listening at http://%s', process.env.C9_HOSTNAME);
});
