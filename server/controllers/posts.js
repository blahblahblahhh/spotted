var express     =  require('express'),
    User        =  require('../models/user'),
    postsRouter =  express.Router();

    postsRouter.post('/', function(req, res){
      User.findOne({ token: req.headers.token }, function(err, user){
          user.posts.push(req.body);
          user.save(function(){
            res.json(user);
          });
        });
      });

    postsRouter.delete('/:id', function(req, res){
      console.log('Delete Attempt');
      User.findOne({ token: req.headers.token }, function(err, user){
        console.log('user', user);
        user.posts.pull({_id: req.params.id});
        user.save();
      });
    })

    postsRouter.get('/', function(req, res){
      User.find({}, function(err, users){

        var posts = [];

        for (var i = 0; i < users.length; i++) {
          posts.push(users[i].posts);
        }

        posts = [].concat.apply([], posts);

        res.json(posts);

      })
    });

    module.exports = postsRouter;
