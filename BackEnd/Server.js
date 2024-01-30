// to load environment variables from .env file to process.env object
require('dotenv').config()
const express=require('express')
const app= express()
const path=require('path')
const cors=require('cors')
const {logger, logEvents}=require('./middleware/logger')
const errorHandler=require('./middleware/errorHandler')
const DBconnect=require('./config/DB')
const mongoose=require('mongoose')
const cookieParser = require('cookie-parser')

DBconnect()

const PORT=process.env.PORT



//to send data to server in a JSON format
app.use(express.json())
//to use cookie object in the req
app.use(cookieParser())


app.use('/uploads', express.static(path.join(__dirname,'uploads') ) )

// to control how web pages in one domain can request and interact with resources from another domain
app.use(cors())

//to save the error and the response
app.use(logger)

app.use('/', require('./routes/root'))
app.use('/SiteSupplyCraft',require('./routes/products'))
app.use('/SiteSupplyCraft',require('./routes/auth'))
app.use('/SiteSupplyCraft',require('./routes/processing'))
app.use('/SiteSupplyCraft',require('./routes/laborers'))
app.use('/SiteSupplyCraft',require('./routes/messages'))


app.all('/*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'view', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)


mongoose.connection.once('open',()=>{
    console.log('Connect to mongoDB')
    app.listen(PORT,()=>{
        console.log(`Server is running on ${PORT}`)
    })
})

mongoose.connection.on('error',(err)=>{
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
