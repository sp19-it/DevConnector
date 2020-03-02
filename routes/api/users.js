// users.js file needs to be subrouted.
const express = require('express');

const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
// express is a big library
// another layer of express instanciation. Only loading the router portion.
const router = express.Router();

/* testing purpose. subroute '/test'
router.get('/test', (req, res) => res.json({msg: "User Works!"}));*/

// Provide meaning comments. 
// @route   POST api/users/register (about route)
// @desc    Register user
// @access  Public (anybody can access)

router.post('/register', (req, res) => { // req contains the parsed data
  User.findOne({email: req.body.email})
  .then(user => {
    if (user) {
      // every res has status. default is 200
      return res.status(400).json({email: 'Email already exists!'}) 
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password, // plain text password
        avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash; //overwrite
          newUser.save()
          .then(user => res.json(user))
          .catch(err => console.log(err))
        })

      });  // generate key (salt=key)
    }
  })   // previous call finished.
  .catch(err => console.log(err))
})

// @route   POST api/users/login (about route)
// @desc    Login user
// @access  Public (anybody can access)
router.post('/login', (req, res) => {
  User.findOne({email: req.body.email})
  .then(user => {
    if (!user) {
      return res.status(404).json({email: 'User not found'});
    } else {
      bcrypt.compare(req.body.password, user.password)
      .then(isMatch => {
        if (isMatch) {
          // User matched, let's create token
          // pick pieces of info to create a token -> payload
          const payload = {
            id: user.id, 
            name: user.name, 
            avatar: user.avatar};

            // sign (create) token
            jwt.sign(
              payload, 
              keys.secretOrKey,
              {expiresIn: 3600}, (err, token) => {
                res.json({
                  success: true,
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

// Pick what I want to export: router. 
module.exports = router;