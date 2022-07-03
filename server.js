require('dotenv').config()
const express = require('express');
const app = express();
app.set('view engine', 'ejs')
app.get('/',(req,res)=>{
    res.render("index")
})

app.listen(process.env.PORT,()=>console.log(`Server is listening on port ${process.env.PORT}`));