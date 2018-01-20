var user = require('../controller/user');
var express = require('express');
var usersModel = require('../models/user');
var answers = require('../modules/answers/answersModel');
var processes = require('../modules/processes/processesModel');
var polls = require('../modules/polls/pollsModel');
var events = require('../modules/events/eventsModel');


var router = express.Router();

function isVerifiedToken(req, res, next) {
  if (!req.get('Authorization')) {
    res.json({
      code: -1,
      message: 'Phiên làm việc hết hạn'
    });
  }
  else {
    var accessToken = req.get('Authorization').substring(13);
    usersModel.findOne({ access_token: accessToken }, function (err, users) {
      if (err || !users) {
        res.json({
          code: -1,
          message: 'Phiên làm việc hết hạn'
        });
      } else {
        req.users = users;
        return next();
      }
    });
  }
}

router.post('/login', user.login);
router.get('/logout', isVerifiedToken, user.logout);
router.get('/users',isVerifiedToken, user.getUsersOnPage);
router.get('/users/:id',isVerifiedToken, user.getUserById);
router.post('/users',user.addUser);
router.put('/users', isVerifiedToken, user.editUser);
router.put('/me', isVerifiedToken, user.updateProfile);

router.get('/answers',isVerifiedToken, answers.getAnswersOnPage);
router.get('/answers/:id',isVerifiedToken, answers.getAnswerById);
router.post('/answers',isVerifiedToken,answers.addAnswer);
router.put('/answers', isVerifiedToken, answers.editAnswer);

router.get('/events',isVerifiedToken, events.getEventsOnPage);
router.get('/events/:id',isVerifiedToken, events.getEventById);
router.post('/events',isVerifiedToken,events.addEvent);
router.put('/events', isVerifiedToken, events.editEvent);

router.get('/polls',isVerifiedToken, polls.getPollsOnPage);
router.get('/polls/:id',isVerifiedToken, polls.getPollById);
router.post('/polls',isVerifiedToken,polls.addPoll);
router.put('/polls', isVerifiedToken, polls.editPoll);

router.get('/processes',isVerifiedToken, processes.getProcessesOnPage);
router.get('/processes/:id',isVerifiedToken, processes.getProcessById);
router.post('/processes',isVerifiedToken,processes.addProcess);
router.put('/processes', isVerifiedToken, processes.editProcess);

router.get('/users',isVerifiedToken, user.getUsersOnPage);
router.get('/users/:id',isVerifiedToken, user.getUserById);
router.post('/users',isVerifiedToken,user.addUser);
router.put('/users', isVerifiedToken, user.editUser);

// -------------------------------- User --------------------------------------------------
router.post('/u/user/', user.add);

module.exports = router;
