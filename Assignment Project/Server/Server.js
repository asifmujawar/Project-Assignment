const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const env = require('dotenv')
const jwt = require('jsonwebtoken');
const dataSchema = require('./models/dataSchema')
const authorize = require('./authorize')
const app = express();
const cookies = require('cookie-parser')
mongoose.connect('mongodb://Asif:123@cluster0-shard-00-00.h27sm.mongodb.net:27017,cluster0-shard-00-01.h27sm.mongodb.net:27017,cluster0-shard-00-02.h27sm.mongodb.net:27017/ASIF?ssl=true&replicaSet=atlas-10n08j-shard-0&authSource=admin&retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("Mongoose Database Connected")
})

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

env.config()
app.use(cookies())

app.post('/login',(req,res)=>{
    const {email,password} = req.body;
    console.log("This is Login Request")
    dataSchema.findOne({email:req.body.email}).exec((err,result)=>{
        if(!result){
            res.status(501).json({
                msg:'User Not Found'
            })
        }
        else{
            bcrypt.compare(password,result.password,(err,reslt)=>{
                if(!reslt){
                    res.status(502).json({
                        msg:'Password Incorrect'
                    })
                }
                else{
                    let token = jwt.sign({_id:result._id},process.env.SECRETE)
                    res.cookie("User-TKN",token,{
                        expires:new Date(Date.now() + 2598768900),
                        httpOnly:true
                    })
                    result.tokens = result.tokens.concat({token:token})
                    result.save()
                    res.status(503).json({
                        msg:'User Logged in Successfully'
                    })
                }
            })
        }
    })
})

app.post('/register',(req,res)=>{
    console.log("This is Register Route");
    const {name,email,mobno,password} = req.body;
    const data = new dataSchema({
        name:name,
        email:email,
        mobno:mobno,
        password:password
    });

    dataSchema.findOne({email:email}).exec((err,result)=>{
        if(result){
            res.status(400).json({
                msg:'User alread Registered'
            })
        }
        else{
            
            console.log(password)

            bcrypt.hash(password,10,(err,hash)=>{
                const data = new dataSchema({
                    name:name,
                    email:email,
                    mobno:mobno,
                    password:hash
                })
    
                data.save((err)=>{
                    if(err){
                        res.status(401).json({
                            message:err,
                            m:"Wrong"
                        })
                    }
                    else{
                        res.status(200).json({
                            Message:"Registration Successfull"
                        })
                    }
                })
            })  
        }
    })
})

app.get('/dummy',(req,res)=>{
    console.log("This is Dummy API");
})

app.get('/account',authorize,(req,res)=>{
    const token = req.cookies["User-TKN"]
    console.log(token)
    console.log("Student Profile")
    console.log(req.user)
    if(req.user !== ''){
        res.status(200).json({
            student:req.user
        })
    }
    else{
        res.status(300).json({
            msg:"User Not Verified"
        })
    }
    // res.status(200).json({
    //     student:req.user
    // })
})

app.get('/googleroute',(req,res)=>{
    
})

app.get('/logout',(req,res)=>{
    res.clearCookie('User-TKN',{path:'/'})
    res.status(200).json({
        msg:'User Logged Out'
    })
})

app.listen(4000,()=>{
    console.log("The server is Running on port 3000");
});