const mongoose = require('mongoose');
const uuidV4 = require('uuid4');
const ls = require('local-storage');
const eventOwnersSchema = require('./eventOwnersSchema');

let eventOwnersModel = mongoose.model('eventOwners', eventOwnersSchema);

var login =  function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        eventOwnersModel.findOne({username: username})
            .exec(function (err, eventOwner) {
                if (err) {
                    res.json({code: 0, error: err});
                }
                else if (!eventOwner) {
                    res.json({code: 2, error: 'Sai tên đăng nhập'});
                }
                else if (!eventOwner.validPassword(password)) {
                    res.json({code: 3, error: 'Sai mật khẩu'});
                }
                else {
                    res.json({
                        code: 1,
                        access_token: eventOwner.access_token,
                        eventOwner: eventOwner
                    });
                    // ls.set('at', eventOwner.access_token)
                }
            });
    }

var logout =  function (req, res) {
        var eventOwnerId = req.eventOwner._id;
        eventOwnersModel.update(
          {_id: eventOwnerId},
          {access_token: uuidV4()},
          function (err) {
            if (err) res.json({code: 0, error: err});
            else {
                req.eventOwner = undefined;
                res.json({code: 1 });
            }
        });
}


var getEventOwnersOnPage = function (req, res) {
        var page = req.query.page || 1;
        eventOwnersModel.find()
            .populate('events')
            .sort({created_at: -1})
            .skip((page - 1) * 20)
            .limit(20)
            .exec(function (err, eventOwners) {
                if (err) {
                    res.json({ code: 1, error: err });
                } else {
                    res.json({
                        code: 1,
                        result: eventOwners
                    });
                }
            });
}
var getEventOwners = function (req, res) {
        eventOwnersModel.findOne({id: req.query.id})
            .populate('events')
            .exec(function (err, eventOwner) {
                if (err) {
                    res.json({ code: 1, error: err });
                } else {
                    res.json({
                        code: 1,
                        result: eventOwner
                    });
                }
            });
}
var getNumberOfEventOwners = function (req, res) {
        eventOwnersModel.count()
            .exec(function (err, c) {
                if (err) {
                    res.json({ code: 1, error: err });
                } else {
                    res.json({
                        code: 1,
                        result: c
                    });
                }
            });
    }
var addEventOwner = function(req, res) {
          var eventOwners = new eventOwnersModel({
            name : req.body.name,
            password : req.body.password,
            username : req.body.username,
            access_token : uuidV4()
          });
          EventOwners.save(function (err) {
              if (err) res.json({code: 0, error: err});
              else {
                  res.json({code: 1, result: eventOwners});
              }
          });
      }
var editEventOwner = function (req, res) {
  var eventOwnersId = req.query.eOId;
       eventOwnersModel.findOne({_id: eventOwnersId}, function (err, eventOwner) {
           if (err) res.json({code: 0, error: err});
           else if (!eventOwner) res.json({code: 2, error: 'khong tim thay chu su kien'});
           else {
             var password = req.query.password;
             var name = req.query.name;
             if(password) users.password = password;
             if(name) users.name = name;
               eventOwners.save(function (err) {
                   if (err) res.json({code: 0, error: err});
                   else{
                       res.json({code: 1, result: eventOwner});
                   }
               });
           }
       });
}

const getEventOwnerById = (id, callback) => {
  eventOwnersModel.findOne({'_id' : id}, (err, doc)=> {
    if(err) {
      res.send(err);
    } else{
      callback(null, doc);
    }
  }).populate('events');
};
const updateProfile = (req, res) =>{

}
module.exports = {
  addEventOwner,
  editEventOwner,
  getEventOwnersOnPage,
  getNumberOfEventOwners,
  getEventOwnerById,
  getEventOwners,
  login,
  logout,
  updateProfile
}
