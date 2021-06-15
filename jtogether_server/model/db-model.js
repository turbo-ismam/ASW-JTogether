const mongoose = require('mongoose');

/*       Activity        */
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
    virtuals: false,
    versionKey: false,
    transform: function (_, ret) {
        delete ret._id;
    }
})

/*       Message        */
const messageSchema = mongoose.Schema({
    message : { type: String, required : true},
})

messageSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
})

/*       Chat        */
const chatSchema = mongoose.Schema({
    activity_id : {type : String , required : true},
    messages : {type : [messageSchema],default: [], required : true}
})

chatSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
})


/*       User        */
const userSchema = mongoose.Schema({
    username : {type: String, unique: true, required: true},
    email : {type : String, unique : true, required : true},
    chats : {type : [String], default: [], required : true},
    created_activities : {type : [String], default: [], required : true},
    participated_activities : {type : [String], default: [], required : true},
    hash : {type: String, required: true}
})

userSchema.set('toJSON', {
    virtuals: false,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
})

module.exports = {
    User: mongoose.model('User',userSchema),
    Activity : mongoose.model('Activity',activitySchema),
    Chat : mongoose.model('Chat',chatSchema),
    Message: mongoose.model('Message',messageSchema)
}


