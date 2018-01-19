const mongoose = require('mongoose');
const processesSchema = require('./processesSchema');

let processesModel = mongoose.model('processes', processesSchema);

var getProcessesOnPage = function (req, res) {
        var page = req.query.page || 1;
        processesModel.find()
            .sort({created_at: -1})
            .skip((page - 1) * 20)
            .limit(20)
            .exec(function (err, processes) {
                if (err) {
                    res.json({ code: 1, error: err });
                } else {
                    res.json({
                        code: 1,
                        result: processes
                    });
                }
            });
}
var getProcesses = function (req, res) {
        processesModel.findOne({id: req.query.id})
            .exec(function (err, process) {
                if (err) {
                    res.json({ code: 1, error: err });
                } else {
                    res.json({
                        code: 1,
                        result: process
                    });
                }
            });
}
var getNumberOfProcesses = function (req, res) {
        processesModel.count()
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
var addProcess = function(req, res) {
          var processes = new processesModel({
            name : req.body.name,
            des : req.body.des,
            end : req.body.end,
            start : req.body.start
          });
          processes.save(function (err) {
              if (err) res.json({code: 0, error: err});
              else {
                  res.json({code: 1, result: processes});
              }
          });
      }
var editProcess = function (req, res) {
  var processesId = req.query.pId;
       processesModel.findOne({_id: processesId}, function (err, process) {
           if (err) res.json({code: 0, error: err});
           else if (!process) res.json({code: 2, error: 'khong tim thay chu su kien'});
           else {
             var des = req.query.des;
             var end = req.query.end;
             var start = req.query.start;
             var name = req.query.name;
             if(des) processes.des = des;
             if(end) processes.des = end;
             if(start) processes.des = start;
             if(name) processes.des = name;
               processes.save(function (err) {
                   if (err) res.json({code: 0, error: err});
                   else{
                       res.json({code: 1, result: process});
                   }
               });
           }
       });
}

const getProcessById = (id, callback) => {
  processesModel.findOne({'_id' : id}, (err, doc)=> {
    if(err) {
      res.send(err);
    } else{
      callback(null, doc);
    }
  });
};
module.exports = {
  addProcess,
  editProcess,
  getProcessesOnPage,
  getNumberOfProcesses,
  getProcessById,
  getProcesses
}
