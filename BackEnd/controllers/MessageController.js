const asyncHandler=require('express-async-handler')
const Message=require('../models/messagesModel')
const User=require('../models/userModel')
const {io,getReceiverSocketId}=require('../Socket/socket')

//To Send a message  /message/send
 const sentMessage=asyncHandler(async(req,res)=>{
    try {
        const {receiver,content}=req.body
        req.body.sender=req.user._id
        const data =await Message.create(req.body)

        ///
        let msgs
        if(receiver)
        {
             msgs =await Message.find(
                { $or:[
                     {sender:receiver},
                     {receiver:receiver}
                     ]
                 }
             ).sort('date')
        }
        else{
            const {id}=req.user
            msgs =await Message.find(
            { $or:[
                    {sender:id},
                    {receiver:id}
                    ]
                }
            ).sort('date')
        }
        /* const receiverSocketId = getReceiverSocketId(receiver);
        if (receiverSocketId) {
          //io.to(receiverSocketId).emit() use to send events to specific clients
          io.to(receiverSocketId).emit("newMessage", data);
        } */
        res.status(201).json({success:true,Message:data,count:msgs.length,Messages:msgs})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error sending message' });
    }
})
//To Get all sent and revieved by particular Product Owner /messages
 const Messages=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.user
        // Find messages where isViewed is false and update them to true
        await Message.updateMany(
            {
                $or: [
                    { sender: id },
                    { receiver: id }
                ],
                isViewed: false
            },
            { $set: { isViewed: true } }
        );
        const data =await Message.find(
           { $or:[
                {sender:id},
                {receiver:id}
                ]
            }
        ).sort('date')
        
        res.status(200).json({success:true,count:data.length,Messages:data})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching messages' });
    }
})
//To Get all sent and revieved by particular Product Owner /Uread_Messages
 const UnreadMsg=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.user
        const data =await Message.find(
           {    receiver:id
                ,
                isViewed: false
            }
        ).sort('date')
        
        res.status(200).json({success:true,count:data.length,Messages:data})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching messages' });
    }
})

//TO get all messages from admin side /messages/:id
const messagesFromAdmin=asyncHandler(async(req,res)=>{
    try {
        const { id } = req.params;
    
        // Find messages where isViewed is false and update them to true
        await Message.updateMany(
            {
                $or: [
                    { sender: id },
                    { receiver: id }
                ],
                isViewed: false
            },
            { $set: { isViewed: true } }
        );
    
        // Fetch the updated data
        const data = await Message.find(
            {
                $or: [
                    { sender: id },
                    { receiver: id }
                ]
            }
        ).sort('date');
    
        res.status(200).json({ success: true, count: data.length, Messages: data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching messages' });
    }
    
})

//TO get all messages sent by the product owners Admin/MessagesList
const adminRecievedMessages = asyncHandler(async (req, res) => {
    try {
        // Fetch distinct senders
        const senders = await Message.distinct('sender', { receiver: null });
        //const unreadMsg= await Message.find({isViewed:false,receiver: null});
        const unreadMsg = await Message.aggregate([
            {
                $match: {
                    isViewed: false,
                    receiver: null
                }
            },
            {
                $group: {
                    _id: "$sender", // Group by sender value
                    messages: { $push: "$$ROOT" } // Store the entire document in the 'messages' array
                }
            }
        ]);


        // Fetch latest messages for each sender
        const latestMessages = await Promise.all(
            senders.map(async (senderId) => {
                const user = await User.ProductOwner.findById(senderId);
                const latestMessage = await Message.findOne({ sender: senderId, receiver: null}).sort({ date: -1 });
                return { user, message: latestMessage };
            })
        );

        // Sort latestMessages based on message date
        latestMessages.sort((a, b) => {
            if (a.message && b.message) {
                return new Date(a.message.date) - new Date(b.message.date);
            } else {
                return 0;
            }
        });

        res.status(200).json({ success: true, count: latestMessages.length, unreadMsg:unreadMsg,messages: latestMessages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching messages' });
    }
});


module.exports={
    sentMessage,
    Messages,
    adminRecievedMessages,
    messagesFromAdmin,
    UnreadMsg
}
