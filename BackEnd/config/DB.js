const mongoose=require('mongoose')

const DBconnect=async ()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URI)

    } catch (error) {
        console.log(error)
    }

}

module.exports=DBconnect