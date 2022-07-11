require('dotenv').config()
const multer = require('multer')
const express = require('express');
const mongoose = require('mongoose')
const app = express();
app.use("/static",express.static(__dirname + "/styles"));
app.set('view engine', 'ejs')
const upload = multer({ dest: 'uploads' })
mongoose.connect(process.env.DATABASE_URL,()=>{
    console.log('Connected')
},
e=>{
    console.log('No connection')
}
)
app.get('/',(req,res)=>{
    res.render("index")
})

app.post('/upload',upload.single('file'),(req,res)=>{
    res.send("Hello")
})

app.listen(process.env.PORT,()=>console.log(`Server is listening on port ${process.env.PORT}`));