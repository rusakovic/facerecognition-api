const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

// Initializing the database
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'smart-brain'
    }
  });



const app = express();

app.use(bodyParser.json());

// To fix google chorme error: Access to fetch at 'http://localhost:3000/' from origin 'http://localhost:3001' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
app.use(cors());



// INITIAL APP
app.get('/', (req, res) => {
    res.send(database.users);
})

// SIGN IN controllers/signin.js
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

//REGISTER controllers/register.js
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

// PROFILE
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })

//IMAGE COUNT
app.put('/image', (req, res) => { image.handleImage(req, res, db) })

//IMAGE API
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })


// PORT LISTENING
app.listen(3000, () => {
    console.log('app is running on port 3000');
})



















