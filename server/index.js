const express = require('express');
const cors = require('cors');
const passport = require('passport');
const passportRoutes = require('./routes/passport');
const {api} = require('./routes/index');
const auth = require('./routes/auth');
const admin = require('firebase-admin');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
passportRoutes.initPassport();
app.use(passport.initialize());
app.use(cors());
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: 'admiosapi',
});

//app.use('/v1', routes);
app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the Movie API'
}));
app.use('/api',api);
  
app.listen(8000, () => {
    console.log(`app listening at http://localhost:8000`)
  });
