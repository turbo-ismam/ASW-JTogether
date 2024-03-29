const {Activity,Message} = require('../_helpers/db')

const MAX_DISTANCE_METERS = 50_000

module.exports = {
    createActivity,
    deleteParticipation,
    deleteActivity,
    createParticipation,
    modifyActivity,
    getActivity,
    getActivities,
    getNearActivities,
    searchActivities,
    createMessage
}

async function createActivity(activityParams){
    return new Activity(activityParams).save()
}

async function createMessage(activityId,message,username){
    const messageSchema = new Message({message:message, username: username})
    return Activity.findByIdAndUpdate(activityId,{$push: {chat: messageSchema}},{new: true}).exec()
        .then( _ => messageSchema)
}

async function getNearActivities(username,longitude,latitude){
    return Activity
        .aggregate([
            {$geoNear: {
                    near: {type: "Point", coordinates: [longitude, latitude]},
                    spherical: true,
                    maxDistance: MAX_DISTANCE_METERS,
                    distanceField: "distance"
            }},
            {$match: {creator_username: {$ne: username}}},
            {$match: {participants: {$ne: username}}},
    ]).exec()
}

async function searchActivities(username,text) {
    const regex = new RegExp(text, 'ig');
    return Activity.find(
        {$and: [
            {creator_username: {$ne: username}},
            {participants: {$ne: username}},
            {creator_username : {$ne: username}},
            {$or: [{name: regex}, {description: regex}, {location: regex}, {creator_username: regex}]}
        ]}).exec()
}

async function modifyActivity(activityParams){
    return Activity.findByIdAndUpdate(activityParams.activity_id,activityParams,{new: true}).exec()
}

async function deleteActivity(activity_id){
    return Activity.findByIdAndDelete(activity_id).exec()
}

async function createParticipation(activity_id,username){
    return Activity.findByIdAndUpdate(activity_id,{$addToSet:{participants : username}},{new : true}).exec()
}

async function deleteParticipation(activity_id,username){
    return Activity.findByIdAndUpdate(activity_id,{$pull :{participants : username}},{new : true}).exec()
}

async function getActivity(id){
    return Activity.findById(id).exec();
}

async function getActivities(ids){
    return Activity.find({_id : ids}).exec()
}





