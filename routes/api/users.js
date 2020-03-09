// users.js file needs to be "subrouted" to register or login
const express = require('express');

const User = require('../../models/User'); // User model
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const passport = require('passport');

// express is a big library. this is another layer of express instanciation. loading only the router portion in memory.
const router = express.Router();

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

/* testing purpose. subroute '/test'
router.get('/test', (req, res) => res.json({msg: "User Works!"}));*/

/* provide meaning, comments */
// @route   POST api/users/register (about route)
// @desc    Register user
// @access  Public (anybody can access)
router.post('/register', (req, res) => { // req contains the parsed body of the data
  const {errors, isValid} = validateRegisterInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // looking at User collection(already talking to MongoDB), and find the match (match the Schema)
  User.findOne({email: req.body.email})
    .then(user => {     // previous call finished
    if (user) {
      // every res has status. default is 200
      return res.status(400).json({email: 'Email already exists!'}) 
    } else {
      
      const avatar = gravatar.url(req.body.email, {
        s: '200', // size
        r: 'pg', // only show appropriate image
        d: 'mm' // if there is no image, give default
      });

      // create this new user in the database
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password, // this plain text password needs to be encrypted (below)
        avatar // deconstruction (avatar: avatar)
      });

      // encryption, hash password
      bcrypt.genSalt(10, (err, salt) => {  // asking bcrypt library to generate a key for me. Key will be maintained. err:fail, salt:key
        if (err) throw err;  
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash; //overwrite to the hashed password
          newUser.save()
          .then(user => res.json(user)) // MongoDB creates date, id(primary unique key), version as well
          .catch(err => console.log(err))
        })
      });  
    }
  }) 
  .catch(err => console.log(err))
})

// @route   POST api/users/login (about route)
// @desc    Login user
// @access  Public (anybody can access)
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  User.findOne({email: req.body.email})
  .then(user => {
    if (!user) {
      return res.status(404).json({email: 'User not found'});
    } else {
      bcrypt.compare(req.body.password, user.password) // "user" is already in the database
      .then(isMatch => {
        if (isMatch) {
          // User matched, let's create token. token needs to be generated base off of your identification
          // pick pieces of your info(your identification) to create a token -> payload
          const payload = {
            id: user.id, 
            name: user.name, 
            avatar: user.avatar};

            // sign (create) a token
            jwt.sign(
              payload, 
              keys.secretOrKey,
              {expiresIn: 3600}, (err, token) => {
                res.json({
                  success: true,
                  // Bearer: You have the responsibility whether your delete or not
                  token: 'Bearer ' + token
                })
              })
        } else {
          return res.status(400).json({password: 'Password Incorrect'});
        }
      })
    }
  })
  .catch(err => console.log(err))
})

// @route   GET api/users/current 
// @desc    Return current user info
// @access  Private : needs 3 param. intermediate step, passport
router.get('/current',
  passport.authenticate('jwt', {session: false}), //let the passport figure out the token. {session: carry the session on the new page?}
  (req, res) => {
    res.json({
      id: req.user.id,  // user is already filled by passport 
      name: req.user.name,
      email: req.user.email
    })
  }
)

// pick what I want to export: router. 
module.exports = router;
