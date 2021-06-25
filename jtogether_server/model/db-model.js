const mongoose = require('mongoose');

const activitySchema = mongoose.Schema({
    creator_username : { type: String, required : true, index: 'text'},
    name: { type: String, required: true, index: 'text'},
    description: { type: String, required: true, index: 'text'},
    date_time: { type: Date, required: true},
    participants : {type : [String], default: [], required:true },
    location: {type: String, required: true, index: 'text'},
    geolocation: {type: [Number], index: '2dsphere', required: true}
})
activitySchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
})

const notificationSchema = mongoose.Schema({
    _id: false,
    activityName: {type: String, required: true},
    activityOwner: {type: String, required: true},
    message: {type: String, required: true},
    date_time: {type: Date, required: true, default: new Date()}
})

const userSchema = mongoose.Schema({
    username : {type: String, unique: true, required: true},
    email : {type: String, unique : true, required : true},
    created_activities : {type: [String], default: [], required : true},
    participated_activities : {type: [String], default: [], required : true},
    hash : {type: String, required: true},
    notifications: {type: [notificationSchema], default: [], required: true}
})

userSchema.set('toJSON', {
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
})

module.exports = {
    User: mongoose.model('User',userSchema),
    Activity : mongoose.model('Activity',activitySchema),
}


