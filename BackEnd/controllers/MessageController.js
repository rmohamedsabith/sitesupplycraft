const asyncHandler=require('express-async-handler')
const Message=require('../models/messagesModel')

//To Send a message  /message/send
 const sentMessage=asyncHandler(async(req,res)=>{
    try {
        const {sender,receiver,content}=req.body
        const data =await Message.create({sender,receiver,content})
        res.status(201).json({success:true,Message:data})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error sending message' });
    }
})
//To Get all sent and revieved by particular Product Owner /messages
 const Messages=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.body
        const data =await Message.find(
           { $or:[
                {sender:id},
                {receiver:id}
                ]
            }
        ).sort('date')
        res.status(200).json({success:true,count:data.length,Message:data})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching messages' });
    }
})

//TO get all messages sent by the product owners Admin/MessagesList
 const adminRecievedMessages=asyncHandler(async(req,res)=>{
    try {
        const data =await Message.distinct('sender', { receiver: null }).sort('date')
        const latestMessages = await Promise.all(
            data.map(async (sender) => {
                return await Message.findOne({ sender, receiver: null }).sort({ date: -1 });
            })
        );

        res.status(200).json({ success: true,count:data.length, messages: latestMessages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching messages' });
    }
})

module.exports={
    sentMessage,
    Messages,
    adminRecievedMessages
}
