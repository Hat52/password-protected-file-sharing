require('dotenv').config()
const multer = require('multer')
const express = require('express');
const app = express();
app.use("/static",express.static(__dirname + "/styles"));
app.set('view engine', 'ejs')
const upload = multer({ dest: 'uploads' })
app.get('/',(req,res)=>{
    res.render("index")
})

app.post('/upload',upload.single('file'),(req,res)=>{
    res.send("Hello")
})

app.listen(process.env.PORT,()=>console.log(`Server is listening on port ${process.env.PORT}`));