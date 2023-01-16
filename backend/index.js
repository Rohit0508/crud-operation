const express =require('express')
const cors=require('cors');
require('./db/config');
const users=require('./db/users');


const app =express();


app.use(express.json());
app.use(cors());

app.post('/register',async(req,resp)=>{
    let user= new users(req.body);
    let result=await user.save();
    result=result.toObject();
    delete result.password;

    resp.send(result);
})

app.post('/login',async(req,resp)=>{
    let user= await users.findOne(req.body).select("-password");
    if(req.body.password&&req.body.email)//to verify that email and pass. are send
    {
        if(user)
        {
            resp.send(user);
        }
        else{
            resp.send({result:"user not found"});
        }
    }
    else{
        resp.send({result:"user not found"});
    }
    
})

app.listen(6800);