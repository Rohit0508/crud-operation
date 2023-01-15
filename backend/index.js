const express =require('express')
// const cors=require('cors');
require('./db/config');
const users=require('./db/users');


const app =express();


app.use(express.json());
// app.use(cors());

app.post('/register',async(req,resp)=>{
    let user= new users(req.body);
    let result=await user.save();


    resp.send(result);
})

app.listen(6000);