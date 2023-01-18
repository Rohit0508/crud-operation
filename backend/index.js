const express =require('express')
const cors=require('cors');
require('./db/config');
const users=require('./db/users');
const Product=require("./db/product");

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
app.listen(6800);