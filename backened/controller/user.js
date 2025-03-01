const User=require("../models/user")

const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const userSignUp=async(req,res)=>{
    try{
const {email,password}=req.body
if(!email || !password)
{
    return res.status(400).json({message:"Email and password"})
}

let user=await User.findOne({email})
if(user){
    return res.status(400).json({error:"email is already exits"})
}
const hashPwd=await bcrypt.hash(password,10)
const newUser=await User.create({
    email,password:hashPwd
})

const token =jwt.sign({email,id:newUser._id},process.env.SECRET_KEY)
return res.status(201).json({token,user:newUser})

    }

    catch(error){
        return res.status(500).json({error:"internal server error",details:error.message});
    }

}

const userLogin=async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(400).json({message:"email and password is required"})
    }

    let user=await User.findOne({email})
    if(user && await bcrypt.compare(password,user.password)){
        let token=jwt.sign({email,id:user._id},process.env.SECRET_KEY)
        return res.status(200).json({token,user})
    }
    else{
        return res.status(400).json({error:"invalid credientials"})
    }

}

const getUser=async(req,res)=>{

    const user=await User.findById(req,useParams.id)

    res.json({email:user.email})

}

module.exports={userLogin,userSignUp,getUser}
