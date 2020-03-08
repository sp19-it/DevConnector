// User.js: deifinition of what one "User" object is going to be

// connect to MongoDB, mongoose talks to MongoDB
const mongoose = require('mongoose');

// Schema = definition of data. tell MongoDB that this is a Schema of the collection that we are going to build. write a Schema in MongoDB that will be converted to a collection.
const Schema = mongoose.Schema;

// create new instance of Schema, define structure of User model
// mongoose Schema lets you define each column
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
  // get external api(gravatar.com) and display url(type)
  avatar: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// want to pass a reference to the actual collection in MongoDB. Tell MongoDB to make a collection out of this structure, and pass the reference that is being used.
// ask mongoose to create a model(collection), call collection as "users" using userSchema structure
// 'users' is collection name in MongoDB by using userSchema. User is the model.
// User has direct link to the collection in MongoDB.
module.exports = User = mongoose.model('users', userSchema);