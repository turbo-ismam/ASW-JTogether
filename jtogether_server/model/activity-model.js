const activityApi = require('../apis/activity-api');

const ACTIVITY_NOT_FOUND_ERROR = 'Attività non trovata'
const NOT_ALLOWED_ERROR = 'Utente non autorizzato'

module.exports = {
    createActivity,
    createParticipation,
    deleteParticipation,
    deleteActivity,
    modifyActivity,
    getActivities,
    getNearActivities,
    searchActivities,
    createMessage
}

async function getNearActivities({username},{latitude,longitude}){
    return activityApi.getNearActivities(username,parseFloat(longitude),parseFloat(latitude))
        .then(as => as.map(a => a._id))
        .then(ids => activityApi.getActivities(ids));
}

async function searchActivities({username},{text}){
    return activityApi.searchActivities(username,text)
}

async function createMessage({username},{activity_id,message}){
    return activityApi.createMessage(activity_id,message,username)
}

async function getActivities({activities_id}){
    return activityApi.getActivities(activities_id)
}

async function createActivity(activityParams,{username}){
    activityParams.creator_username = username
    activityParams.geolocation = [activityParams.longitude, activityParams.latitude]
    return activityApi.createActivity(activityParams)
}

async function modifyActivity(activityParams,{username}){
    await checkUserAndActivity(activityParams.activity_id,username)
    return activityApi.modifyActivity(activityParams)
}

async function changeUsername(activityId,oldUsername,newUsername){
    return activityApi.changeUsername(activityId,oldUsername,newUsername)
}

async function deleteActivity({activity_id},{username}){
    await checkUserAndActivity(activity_id,username)
    return activityApi.deleteActivity(activity_id)
}

async function createParticipation({activity_id},{username}){
    return activityApi.createParticipation(activity_id,username)
}

async function deleteParticipation({activity_id},{username}){
    return activityApi.deleteParticipation(activity_id,username)
}

async function checkUserAndActivity(activityId,username){
    const activity = await activityApi.getActivity(activityId)
    if(!activity){
        throw ACTIVITY_NOT_FOUND_ERROR
    }

    if(activity.creator_username !== username){
        throw NOT_ALLOWED_ERROR
    }

}



