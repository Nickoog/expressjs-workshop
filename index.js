var express = require('express');
var bodyParser = require('body-parser');
var RedditAPI = require('../reddit-nodejs-api/reddit');
var app = express();
var mysql = require('promise-mysql');

var connection = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database: 'reddit_api',
    connectionLimit: 10
});
 

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

var myReddit = new RedditAPI(connection);

app.get('/posts', function(request, response){

      myReddit.getAllPosts()
          .then(function(posts) {
            console.log(posts)
              var output = `
                <div id="posts">
                  <h1> List of posts </h1>
                  <ul class="messages-list">
                    ${posts.map(function(post){
                      return `
                        <li class="post-item">
                          <h2 class="post-item__${post.post_title}">
                            <a href="${post.post_url}">${post.post_title}</a>
                          </h2>
                          <p>Created by ${post.user.username}</p>
                        </li>
                      `
                    })}
                  </ul>
                </div>
              `
              response.send(output);
          });
  });
  

app.get('/new-post', function(request, response) {
    response.send(`
        <form action="/createPost" method="POST"><!-- why does it say method="POST" ?? -->
          <p>
            <input type="text" name="url" placeholder="Enter a URL to content">
          </p>
          <p>
            <input type="text" name="title" placeholder="Enter the title of your content">
          </p>
          <button type="submit">Create!</button>
        </form>
    `);
});

app.post('/createPost', function(request, response) {
    myReddit.createPost({
        title: request.body.title,
        url: request.body.url,
        userId: 1,
    }).then(function(posts){
        response.use
    })
        
            
        
    
})





/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  console.log('Example app listening at http://%s', process.env.C9_HOSTNAME);
});
