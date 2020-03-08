// I am using JWT version of passport
const JwtStrategy = require('passport-jwt').Strategy;
// token request, pass it to header. Where is the header? locate authorization place
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

// create object. options.
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // JwtStratety needs two parameters
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => { // decrypted token
    User.findById(jwt_payload.id) // validate in MongoDB
    .then(user => {
      if (user) {
        return done(null, user);
      }
      return done(null, false); //loacted the token, but not user
    })
    .catch(err => console.log(err));
  }))
}