const mongoose = require('mongoose');
const answersSchema = require('./answersSchema');

let answersModel = mongoose.model('answers', answersSchema);

var getAnswersOnPage = function (req, res) {
        var page = req.query.page || 1;
        answersModel.find()
            .sort({created_at: -1})
            .skip((page - 1) * 20)
            .limit(20)
            .exec(function (err, answers) {
                if (err) {
                    res.json({ code: 1, error: err });
                } else {
                    res.json({
                        code: 1,
                        result: answers
                    });
                }
            });
}
var getAnswers = function (req, res) {
        answersModel.findOne({id: req.query.id})
            .exec(function (err, answer) {
                if (err) {
                    res.json({ code: 1, error: err });
                } else {
                    res.json({
                        code: 1,
                        result: answer
                    });
                }
            });
}
var getNumberOfAnswers = function (req, res) {
        answersModel.count()
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
var addAnswer = function(req, res) {
          var answers = new answersModel({
            content : req.body.content
          });
          answers.save(function (err) {
              if (err) res.json({code: 0, error: err});
              else {
                  res.json({code: 1, result: answers});
              }
          });
      }
var editAnswer = function (req, res) {
  var answersId = req.query.pId;
       answersModel.findOne({_id: answersId}, function (err, answer) {
           if (err) res.json({code: 0, error: err});
           else if (!answer) res.json({code: 2, error: 'khong tim thay chu su kien'});
           else {
              var content = req.query.content;
              var inc = req.query.inc;
              if(content) answer.content = content;
              if(inc) answer.quantity ++;
               answers.save(function (err) {
                   if (err) res.json({code: 0, error: err});
                   else{
                       res.json({code: 1, result: answer});
                   }
               });
           }
       });
}

const getAnswerById = (id, callback) => {
  answersModel.findOne({'_id' : id}, (err, doc)=> {
    if(err) {
      res.send(err);
    } else{
      callback(null, doc);
    }
  });
};
module.exports = {
  addAnswer,
  editAnswer,
  getAnswersOnPage,
  getNumberOfAnswers,
  getAnswerById,
  getAnswers
}
