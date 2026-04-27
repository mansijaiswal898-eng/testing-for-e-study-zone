const express=require('express')
const User=require('../models/User')
const routes=express.Router();
const jwt=require('jsonwebtoken')

routes.post('/register',async(req,res)=>{
    try{
        const {name,email,password,qualification,role}=req.body;
        const user=await User.findOne({email:email});
        if(user){
            return res.json({msg:"User already Register"})
        } 
        const data =await new User({
            name:name,
            email:email,
            password:password,
            qualification:qualification,
            role:role,
        })
        data.save();
        res.json({msg:"User registered Sccessfully"})
    }
    catch(er){
        console.log(er);
        res.json({msg:"User not registered"})
    }
})


// get user by user id

routes.get('/gesture/:id',async(req,res)=> {
    try{
        const data=await User.findById(req.params.id)
        return res.json({msg:"Data fetched",data:data})
    }
    catch(er){
        console.log(er);;
        return res.json({msg:"users not found"})
    }
})

// get all user

routes.get('/gesture',async(req,res)=>{
    try{
        const data=await User.find({status:"active"}).lean()
        res.json({msg:"User fetch",data:data})
    }
    catch(er){
        console.log(er)
        return res.json({msg:"users not found"})
    }
})

// get all inactive users
routes.get('/getuser/all/inactive',async(req,res)=>{
    try{
        const data=await User.find({status:"inactive"})
        res.json({msg:"user fetch",data:data})
    }
    catch(er){
        console.log(er)
        return res.json({msg:"users not found"})
    }
})

// routes for block the user
routes.get('/block/:id',async(req,res)=>{
    try{
        const data=await User.findByIdAndUpdate(req.params.id,{status:"inactive"});
        res.json({msg:"user blocked successfully"})
    }
    catch(er){
        console.log(er)
        return res.json({msg:"Sorry try again later"})
    }
})

//routes fro unblock the user
routes.get('/unblock/:id',async(req,res)=>{
    try{
        const data=await User.findByIdAndUpdate(req.params.id,{status:"active"});
        res.json({msg:"user unblocked successfully"})
    }
    catch(er){
        console.log(er)
        return res.json({msg:"Sorry try again later"})
    }
})

// login api's

routes.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body
        const data=await User.findOne({email:email})
        if(!data){
            return res.json({msg:"Email is incorrect"})
        }
        if(data.password==password){
            const token=jwt.sign({id:data._id},process.env.JWT_SECRET,{expiresIn:"1d"})
            res.json({msg:"Login Successfully",data:{
                token,
                id:data._id,
                role:data.role,
                email:data.email,
                name:data.name
            }})
        }else{
            return res.json({msg:"Password is incorrect"})
        }
    }
    catch(er){
        console.log(er);
        res.json({msg:"Sorry try again"})
    }
})

module.exports=routes