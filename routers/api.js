var express = require('express');
var mongoose = require('mongoose');
var eventOwnersSchema = require('../modules/eventOwners/eventOwnersSchema');
var eventOwnersModel = mongoose.model('eventOwners', eventOwnersSchema);
var eventOwners = require('../modules/eventOwners/eventOwnersModel');

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
    eventOwnersModel.findOne({ access_token: accessToken }, function (err, eventOwners) {
      if (err || !eventOwners) {
        res.json({
          code: -1,
          message: 'Phiên làm việc hết hạn'
        });
      } else {
        req.eventOwners = eventOwners;
        return next();
      }
    });
  }
}

router.post('/login', eventOwners.login);
router.get('/logout', isVerifiedToken, eventOwners.logout);
router.get('/eventOwners',isVerifiedToken, eventOwners.getEventOwnersOnPage);
router.get('/eventOwners/:id',isVerifiedToken, eventOwners.getEventOwnerById);
router.post('/eventOwners',isVerifiedToken,eventOwners.addEventOwner);
router.put('/eventOwners', isVerifiedToken, eventOwners.editEventOwner);
router.put('/me', isVerifiedToken, eventOwners.updateProfile);

module.exports = router;
