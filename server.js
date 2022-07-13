require('dotenv').config()
const multer = require('multer')
const express = require('express');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const File = require('./models/File')
const app = express();
app.use("/static",express.static(__dirname + "/styles"));
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs')
const upload = multer({ dest: 'uploads' })
mongoose.connect(process.env.DATABASE_URL)
app.get('/',(req,res)=>{
    res.render("index")
})

app.post('/upload',upload.single('file'),async (req,res)=>{
    const {file,body} = req
    const fileData = {
        path:file.path,
        originalName:file.originalname
    }
    if(body.password !==null && body.password !== "") {
        fileData.password = await bcrypt.hash(body.password,10)
    }
    const uploadedFile = await File.create(fileData)
    res.render('index',{downloadLink:`${req.headers.origin}/file/${uploadedFile.id}`})
})

app.route('/file/:id').get(downloadFile).post(downloadFile)

async function downloadFile (req,res) {
    const {params,body} = req
    const foundDocument = await File.findById(params.id)
    if(foundDocument.password !=null) {
        if(req.body.password ==null) {
            res.render('password')
            return
        }
        if(!(await bcrypt.compare(req.body.password,foundDocument.password))) {
            console.log("asd")
            res.render('password',{error:true})
            return
        }
    }
    foundDocument.downloadCount++
    await foundDocument.save()
    res.download(foundDocument.path,foundDocument.originalName)
}
app.listen(process.env.PORT,()=>console.log(`Server is listening on port ${process.env.PORT}`));