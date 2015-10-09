var express  =  require('express'),
    User     =  require('../models/user'),
    usersRouter   =  express.Router();

    usersRouter.get('/', function(req, res){
      User.find({}, function(err, results) {
        res.json(results);
      });
    });

    usersRouter.post('/authentication_token', function(req, res){
      var username = req.body.username;
      var password = req.body.username;
      User.findOne({username: username}, function(err, user){
        user.authenticate(password, function(isMatch){
          if (isMatch){
            user.generateToken();
            user.save(function(){
              res.json({token: user.token});
            });
          } else {
            res.json({status: 401, message: 'Please try again'})
          }
        });
      });
    });

    usersRouter.post('/', function(req,res){
      var user = new User(req.body);
          user.save(function(){
            res.json(user);
          });
        });

    module.exports = usersRouter;
