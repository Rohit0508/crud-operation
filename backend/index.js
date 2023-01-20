const express =require('express')
const cors=require('cors');
require('./db/config');
const users=require('./db/users');
const Product=require("./db/product");

const jwt=require("jsonwebtoken");
const jwtkey='e-comm';

const app =express();


app.use(express.json());
app.use(cors());

app.post('/register',async(req,resp)=>{
    let user= new users(req.body);
    let result=await user.save();
    result=result.toObject();
    delete result.password;

    jwt.sign({result},jwtkey,{expiresIn:"48h"},(err,token)=>{
        if(err){
            resp.send({result:"user not found"});
        }
        resp.send({result,auth:token});
    })
})

app.post('/login',async(req,resp)=>{
    let user= await users.findOne(req.body).select("-password");
    if(req.body.password&&req.body.email)//to verify that email and pass. are send
    {
        if(user)
        {
            jwt.sign({user},jwtkey,{expiresIn:"48h"},(err,token)=>{
                if(err){
                    resp.send({result:"user not found"});
                }
                resp.send({user,auth:token});
            })
            
            
        }
        else{
            resp.send({result:"user not found"});
        }
    }
    else{
        resp.send({result:"user not found"});
    }
    
})

//route for add product
app.post("/add-product",async(req,resp)=>{
    let product=new Product(req.body);
    let result=await product.save();
    resp.send(result);
})

app.get("/product-list",async(req,resp)=>{
    let products= await Product.find();
    
    if(products.length>0)
    {
        resp.send(products);
    }
    else{
        resp.send({result:"No product found"});
    }
})

//for deletig product
app.delete("/product/:id",async(req,resp)=>{
    let result= await Product.deleteOne({_id:req.params.id});
    resp.send(result);
})

app.get("/product/:id",async(req,resp)=>{
    let result=await Product.findOne({_id:req.params.id});
    if(result)
    {
        resp.send(result);
    }
    else
    {
        resp.send({result:"no record found"});
    }
})

app.put("/product/:id",verifytoken,async(req,resp)=>{
    let result=await Product.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
    )
    resp.send(result);
});

app.get('/search/:key' ,async(req,resp)=>{
    let result=await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
            {category:{$regex:req.params.key}},
            {price:{$regex:req.params.key}}
        ]
    });
    resp.send(result);
})

function verifytoken(req,resp,next){
    let token=req.headers['authorization'];
    if(token)
    {
token=token.split(' ')[1];
jwt.verify(token,jwtkey,(err,valid)=>{
    if(err)
    {
        resp.send({result:"Please give valid token"});
    }
    else{
        next();
    }
})
    }
    else{
        resp.send({result:"Please add token"});
    }

    // next();
};

app.listen(6800);