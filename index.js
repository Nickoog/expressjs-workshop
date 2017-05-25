var express = require('express');
var bodyParser = require('body-parser');
var RedditAPI = require('./reddit');
var app = express();
var mysql = require('promise-mysql');

var connection = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database: 'reddit_api',
    connectionLimit: 10
});

var myReddit = new RedditAPI(connection);

app.use(bodyParser.urlencoded({extended: true}));// cela permet de mettre fin a une demande
 

app.get('/', function(request, response) {
    response.send("<h1>this is the homepage</h1>");
  });

app.get('/hello', function (request, response) {
  
    if (request.query.name) {
        response.send("<h1>Hello</h1>" + request.query.name);
    }
    else {
        response.send("<h1>Hello World!</h1>"); 
    }
  
  });

app.get('/calculator/:operation',function(request,response) {
    
    if(request.params.operation === 'add') {
        response.send(
            {
              'Opération' : 'add' ,
              'firstOperand' : request.query.firstOperand ,
              'secondOperand' : request.query.secondOperand ,
              'solution' : parseInt(request.query.firstOperand) + parseInt(request.query.secondOperand)
              }
          );
    }
    else if(request.params.operation === 'multiply') {
        response.send(
            {
              'Opération' : 'multiply' ,
              'firstOperand' : request.query.firstOperand ,
              'secondOperand' : request.query.secondOperand ,
              'solution' : parseInt(request.query.firstOperand) * parseInt(request.query.secondOperand)
              }
          );
        
    }
    else {
        response.status(400).send('400 Bad Request');
    }
  
    
  });

app.set('view engine', 'pug');

app.get('/posts', function(request, response){

      myReddit.getAllPosts()
          .then(function(posts) {
            console.log(posts)
              response.render('post-list', {posts: posts});
          });
  });
  

app.get('/new-post', function(request, response) {
    response.render('create-content');
});

app.post('/createContent', function(request, response) {
  // console.log();
    myReddit.createPost({
        title: request.body.title,
        url: request.body.url,
        userId: 1,
        subredditId: 1,
    }).then(function(posts){
        response.redirect('posts');
    })
})





/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  console.log('Example app listening at http://%s', process.env.C9_HOSTNAME);
});
