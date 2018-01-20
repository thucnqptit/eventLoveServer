/* eslint-disable camelcase */
/* eslint-disable max-len */
var CODE = require('../constants');
var User = require('../models/user');
var uuidv4 = require('uuid/v4');

const logout = (req, res) => {
    User.update({
        fbId: req.user.fbId,
    }, {
        accessToken: uuidv4(),
    })
        .then(() => {
            res.json({
                code: CODE.SUCCESS,
            });
        })
        .catch((error) => {
            res.json({
                code: CODE.EXCEPTION_ERROR,
                result: 'Error! Logout fail, database exception',
                error: error.message,
            });
        });
};

const verifyToken = (req, res) => {
    const user = req.user;
    res.json({
        code: CODE.SUCCESS,
        result: user,
    });
};

const add = async (req, res) => {

    const name = req.body.name;
    const gender = req.body.gender;
    const email = req.body.email;
    const phone = req.body.phone;
    const fbId = req.body.link;

    const mUser = new User({
        name, gender, email, phone, fbId
    });

    var userTmp = await User.findOne({email: email});
    if (userTmp) {
        const user = await mUser.save();
        if (user) {
            res.json({
                code: CODE.SUCCESS,
                result: user,
            })
        } else {
            res.json({
                code: CODE.OBJECT_NOT_FOUND,
                result: 'Error! Object not found',
            });
        }
    } else {
        res.json({
            code: CODE.OBJECT_NOT_FOUND,
            result: 'Email exist'
        })
    }

};
module.exports = {
    logout,
    add,
    verifyToken,
};
