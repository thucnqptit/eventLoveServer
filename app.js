'use strict'
const firebase = require("firebase");
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config.json');
const api = require('./routers/api');
var configs = {
    apiKey: "AIzaSyDkup1NYJfVsM2vAX5hVPCOY561RrDjOLo",
    authDomain: "my-calender-188720.firebaseapp.com",
    databaseURL: "https://my-calender-188720.firebaseio.com",
    projectId: "my-calender-188720",
    storageBucket: "my-calender-188720.appspot.com",
    messagingSenderId: "879808903839"
  };
firebase.initializeApp(configs);


var app = express();
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(bodyParser.json({ extended : true}));
app.use(bodyParser.urlencoded({ extended : true}));
app.use('/api', api);

mongoose.connect(config.connectionString, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connect to db success');
  }
});

const port = process.env.PORT || 1010;
app.listen(port, (err) => {
  console.log(`App listen on ${port}`);
});
