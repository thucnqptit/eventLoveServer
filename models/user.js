const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    id: Schema.Types.ObjectId,
    fbId: String,
    fbAccessToken: String,
    name: String,
    email: String,
    phone: String,
    accessToken: {
        type: String,
        unique: true,
    },
    registeredAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', userSchema);
