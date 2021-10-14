const express = require('express');
const cors = require('cors');
const passport = require('passport');
const passportRoutes = require('./routes/passport');
const {api} = require('./routes/index');
const admin = require('firebase-admin');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
passportRoutes.initPassport();
app.use(passport.initialize());
app.use(cors());
admin.initializeApp();

//app.use('/v1', routes);
app.use(api);

app.get('/welcome', (req, res) => res.status(200).send({
  message: 'Welcome to the Movie API'
}));
  
  
app.listen(8000, () => {
    console.log(`app listening at http://localhost:8000`)
  });
