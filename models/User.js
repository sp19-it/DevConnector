// deifinition of what one User object is going to be

// connect to MongoDB
const mongoose = require('mongoose');

// what is User? definition of data, mongoose schema lets you define data. converted to collection.
const Schema = mongoose.Schema;

// create new instance of Schema, define structure of User model
const userSchema = new Schema({
  name: {
    type: String, 
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // get external api(gravatar.com) and display url
  avatar: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// pass a reference to the collection in mongoDB. Tell MongoDB to make a collection out of this structure, and pass the reference that is being used.
// 'users' is collection name in MongoDB by using userSchema
module.exports = User = mongoose.model('users', userSchema);