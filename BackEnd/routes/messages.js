const express=require('express')
const { sentMessage, Messages, adminRecievedMessages, messagesFromAdmin, UnreadMsg } = require('../controllers/MessageController')
const { isAuthenticatedUser, authorizedUser } = require('../middleware/authenticate')
const router=express.Router()

router.route('/message/send').post(isAuthenticatedUser,authorizedUser('Product Owner','Admin'),sentMessage)
router.route('/messages').get(isAuthenticatedUser,authorizedUser('Product Owner'),Messages)
router.route('/unread_messages').get(isAuthenticatedUser,authorizedUser('Product Owner','Admin'),UnreadMsg)
router.route('/messages/:id').get(isAuthenticatedUser,authorizedUser('Admin'),messagesFromAdmin)
router.route('/admin/messagesList').get(isAuthenticatedUser,authorizedUser('Admin'),adminRecievedMessages)

module.exports=router