const mongoose = require('mongoose');
const ls = require('local-storage');
const eventsSchema = require('./eventsSchema');
let eventsModel = mongoose.model('events', eventsSchema);
var getEventsOnPage = function (req, res) {
        var page = req.query.page || 1;
        eventsModel.find()
            .populate('processes')
            .populate('polls')
            .sort({created_at: -1})
            .skip((page - 1) * 20)
            .limit(20)
            .exec(function (err, events) {
                if (err) {
                    res.json({ code: 1, error: err });
                } else {
                    res.json({
                        code: 1,
                        result: events
                    });
                }
            });
}
var getEvents = function (req, res) {
        eventsModel.findOne({id: req.query.id})
            .populate('pols')
            .populate('processes')
            .exec(function (err, event) {
                if (err) {
                    res.json({ code: 1, error: err });
                } else {
                    res.json({
                        code: 1,
                        result: event
                    });
                }
            });
}
var getNumberOfEvents = function (req, res) {
        EventsModel.count()
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
var addEvent = function(req, res) {
          var events = new eventsModel({
            name : req.body.name,
            address : req.body.address,
            des : req.body.des,
            end : req.body.end,
            start : req.body.start
          });
          events.save(function (err) {
              if (err) res.json({code: 0, error: err});
              else {
                // usersModel.addUser(req, res){
                //
                // }
                res.json({code: 1, result: events});
              }
          });
      }
var editEvent = function (req, res) {
  var eventsId = req.query.eId;
       eventsModel.findOne({_id: EventsId}, function (err, event) {
           if (err) res.json({code: 0, error: err});
           else if (!event) res.json({code: 2, error: 'khong tim thay su kien'});
           else {
               events.save(function (err) {
                   if (err) res.json({code: 0, error: err});
                   else{
                       res.json({code: 1, result: event});
                   }
               });
           }
       });
}

const getEventById = (id, callback) => {
  eventsModel.findOne({'_id' : id}, (err, doc)=> {
    if(err) {
      res.send(err);
    } else{
      callback(null, doc);
    }
  }).populate('events').populate('processes');
};
module.exports = {
  addEvent,
  editEvent,
  getEventsOnPage,
  getNumberOfEvents,
  getEventById,
  getEvents
}
