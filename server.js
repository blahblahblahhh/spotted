// setting up my dependencies
var express       =     require('express'),
    bodyParser    =     require('body-parser'),
    mongoose      =     require('mongoose'),
    morgan        =     require('morgan');

// my app object
var app = express();

var port = process.env.PORT || 8080;

app. listen(port, function(){
  console.log("...please work");

});

// database
mongoose.connect('mongodb://localhost/food_database');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/food_database');
// server logging
app.use(morgan('dev'));

// public folder
app.use(express.static(__dirname + '/client'));

// bodyparse config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// root route
app.get('/', function(req,res){
  res.sendFile(__dirname + '/client/index.html')
});

// controllers
var UsersController = require('./server/controllers/users');
app.use('/api/users', UsersController);
var PostsController = require('./server/controllers/posts');
app.use('/api/posts', PostsController);

// lisening
app.listen(8080, function(){
  console.log("you are online")
});
