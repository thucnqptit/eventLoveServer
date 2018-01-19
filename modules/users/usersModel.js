const mongoose = require('mongoose');
const usersSchema = require('./usersSchema');

let usersModel = mongoose.model('users', usersSchema);

var login =  function (req, res) {
        var fbid = req.body.fbid;
        usersModel.findOne({fbid: fbid})
            .exec(function (err, user) {
                if (err) {
                    res.json({code: 0, error: err});
                }
                else if (!user) {// tao moi
                  var users = {
                    name : name,
                    fbid : fbid,
                    email : email,
                    avatar : avatar,
                    phone : phone,
                  }
                    addUser()
                    res.json({code: 2, error: 'Sai tên đăng nhập'});
                }
                else {// da co tk
                    res.json({
                        code: 1,
                        access_token: user.access_token,
                        user: user
                    });
                }
            });
    }

var logout =  function (req, res) {
        var userId = req.user._id;
        usersModel.update(
          {_id: userId},
          {access_token: uuidV4()},
          function (err) {
            if (err) res.json({code: 0, error: err});
            else {
                req.user = undefined;
                res.json({code: 1 });
            }
        });
}

var getUsersOnPage = function (req, res) {
        var page = req.query.page || 1;
        usersModel.find()
            .sort({created_at: -1})
            .skip((page - 1) * 20)
            .limit(20)
            .exec(function (err, users) {
                if (err) {
                    res.json({ code: 1, error: err });
                } else {
                    res.json({
                        code: 1,
                        result: users
                    });
                }
            });
}
var getUsers = function (req, res) {
        usersModel.findOne({id: req.query.id})
            .exec(function (err, user) {
                if (err) {
                    res.json({ code: 1, error: err });
                } else {
                    res.json({
                        code: 1,
                        result: user
                    });
                }
            });
}
var getNumberOfUsers = function (req, res) {
        usersModel.count()
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
var addUser = function(user, res) {
          var users = new usersModel({
            name : user.name,
            fbid : user.fbid,
            email : user.email,
            avatar : user.avatar,
            phone : user.phone,
          });
          users.save(function (err) {
              if (err) res.json({code: 0, error: err});
              else {
                  res.json({code: 1, result: users});
              }
          });
      }
var editUser = function (req, res) {
  var usersId = req.query.pId;
       usersModel.findOne({_id: usersId}, function (err, user) {
           if (err) res.json({code: 0, error: err});
           else if (!user) res.json({code: 2, error: 'khong tim thay chu su kien'});
           else {
             var fbid = req.query.des;
             var avatar = req.query.end;
             var email = req.query.start;
             var name = req.query.name;
             var phone = req.query.phone;
             if(fbid) users.fbid = fbid;
             if(end) users.end = end;
             if(start) users.start = start;
             if(name) users.name = name;
             if(phone) users.phone = phone;
               users.save(function (err) {
                   if (err) res.json({code: 0, error: err});
                   else{
                       res.json({code: 1, result: user});
                   }
               });
           }
       });
}

const getUserById = (id, callback) => {
  usersModel.findOne({'_id' : id}, (err, doc)=> {
    if(err) {
      res.send(err);
    } else{
      callback(null, doc);
    }
  });
};
module.exports = {
  addUser,
  editUser,
  getUsersOnPage,
  getNumberOfUsers,
  getUserById,
  getUsers
}
