const express=require('express')
const Admin=require('../models/Admin')
const routes=express.Router();
const jwt=require('jsonwebtoken')

routes.post('/register',async(req,res)=>{
    try{
        const{email,password}=req.body
        const data=await Admin.findOne({email:email})
        if(data){
            return res.json({msg:"Duplicate male"})
        }
        const user=await new Admin(req.body);
        user.save();
        res.json({msg:"Admin already registered"})
    }
    catch(er){
        console.log(er);
        res.json({msg:"Sorry try again"})
    }
})

// for login

routes.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body
        const isExist=await Admin.findOne({email:email})
        if(!isExist){
            return res.json({msg:"Data not matched"})
        }
        if(isExist.password=password){
            const token=jwt.sign({id:isExist._id},process.env.JWT_SECRET,{expiresIn:"1d"});
            res.json({msg:"Login successfully",data:{
                token:token,
                email:isExist.email,
                id:isExist._id,
                role:"admin"
            }})
        }
        else{
            res.json({msg:"incorrect password"})
        }
    }
    catch(er){
        console.log("Sorry try again");
        res.json({msg:"sorry try again"})
    }
})

module.exports=routes