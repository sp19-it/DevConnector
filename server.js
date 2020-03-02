// import libraries
const express = require('express'); // router
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');

// break into 3 files. don't write all in server.js
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

// create an instance of express. instanciate express. whole express memory
const app = express();

// body parser middleware(fuction/configuration). parse body of html and create json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config. read the config file and pass it to mongoose
const db = require('./config/keys').mongoURI;

// connect to MongoDB
mongoose
.connect(db)
.then(() => console.log("MongoDB Connected!"))
.catch(err => console.log(err));

// write the first route
// when user comes to the homepage "/"
app.get("/", (req, res) => res.send("Hello! World!"));

// routing. When you see 'api/users' then take them to users. 
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// write port
const port = 8020;
app.listen(port, () => console.log(`Server running on port${port}`));

