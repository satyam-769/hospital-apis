import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import {db} from './config/mongoose.js';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import passportStrategy from './config/passport-jwt-strategy.js';
import routes from './routes/index.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }))

const sessionStore = new MongoStore({
  client: db.getClient(),
  collectionName: 'sessions'
})

app.use(session(
  {
    name: 'hospital_api',
    secret:'secret',
    saveUninitialized: false,
    resave: false,
    cookie:
    {
      maxAge: (1000 * 60 * 100)
    },
    store: sessionStore
  }
))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)

// Use express router
app.use('/', routes)

app.listen(port,function(error){
  if(error)
  {
    console.log(`Error in running the server. Error is ${error}`)
  }
  console.log(`Server is up on the port : ${port}`)
})