// I am using JWT version of passport
const JwtStrategy = require('passport-jwt').Strategy;
// req(token), pass it to Authorization area, header. ExtractJwt will help to find where the header is and locate the authorization section and grab the token from it
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

// create an object. options to extract the token
// JwtStrategy needs two parameters (1.tell me where I can find the token, 2.tell me what the secret key is)
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); 
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => { // decrypted payload
    User.findById(jwt_payload.id) // validate in MongoDB
    .then(user => {
      if (user) {
        return done(null, user); // (done: passport step is done) hand off the call to the next step. pass the user object to the req 
      }
      return done(null, false); // was able to loacte the header and token, but not the user
    })
    .catch(err => console.log(err));
  }))
}