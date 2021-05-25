const express = require('express');
const router = express.Router();
const userModel = require('../model/user-model')
const authModel = require('../model/auth-model')
const validator = require('../validators/validator')
const authValidator = require('../validators/validator-auth')
const jwt = require('../_helpers/jwt')
const sendMessage = require('./controller-util')

const USER_DELETED_MESSAGE = 'Utente cancellato con successo'

router.post('/update-user',jwt.authenticateJWT,authValidator.userSignupValidationRules,validator,updateUser)
router.post('/delete-user',jwt.authenticateJWT,authValidator.tokenValidationRules,validator,deleteUser)

module.exports = router;

async function deleteUser(req,res,next){
    authModel.logout(req.body,req.user)
        .then(() => userModel.deleteUser(req.user)
            .then(() => sendMessage(res,USER_DELETED_MESSAGE))
            .catch(err => next(err)))
        .catch(err => next(err))
}
async function updateUser(req,res,next){
    userModel.updateUser(req.body)
        .then(user => res.json(user))
        .catch(err => next(err))
}