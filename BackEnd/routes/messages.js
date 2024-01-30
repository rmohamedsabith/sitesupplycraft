const express=require('express')
const { sentMessage, Messages, adminRecievedMessages } = require('../controllers/MessageController')
const { isAuthenticatedUser, authorizedUser } = require('../middleware/authenticate')
const router=express.Router()

router.route('/message/send').post(isAuthenticatedUser,authorizedUser(['Product Owner','Admin']),sentMessage)
router.route('/messages').get(isAuthenticatedUser,authorizedUser(['Product Owner','Admin']),Messages)
router.route('/admin/messagesList').get(isAuthenticatedUser,authorizedUser('Admin'),adminRecievedMessages)

module.exports=router