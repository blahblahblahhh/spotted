var mongoose     =    require('mongoose'),
    randToken    =    require('rand-token'),
    bcrypt       =    require('bcrypt-nodejs');

// user model
var UserSchema = new mongoose.Schema({

    username: {type: String, required: true},
    password: {type: String, required: true},
    token: {type: String},
    posts: [
      {
        item: {type: String},
        details: [
        {
          name: {type: String},
          age: {type: Number},
          info: {type: String}
        }
      ],
        geoindex: [
        {
          lat: {type: Number},
          lon: {type: Number}
        }
      ],
      }
    ]
});

UserSchema.pre('save', function(next) {
  var user = this;

  if (user.isModified('password')) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  }

  next();
});

UserSchema.methods.generateToken = function(){
  var user = this;
  user.token = randToken.generate(16);
}

// helpful method to check if password is correct
UserSchema.methods.authenticate = function(password, next){
  var user = this;
  bcrypt.compare(password, user.password, function(err, isMatch) {
    next(isMatch);
  });
};

// Create a User mongoose model based on the UserSchema
var User = mongoose.model('User', UserSchema);

// Export the User model
module.exports = User;
