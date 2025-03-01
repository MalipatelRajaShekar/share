const express=require("express");
const app=express();


const dotenv=require("dotenv").config()
const connectdb=require("./config/connectiondb")


const cors=require("cors")
const PORT=process.env.PORT||3000;

connectdb()
app.use(express.json())
app.use(cors())
app.use(express.static("public"))


 
app.use("/",require("./routes/user"))


app.use("/recipe",require("./routes/recipe"));


app.listen(PORT,(err)=>{
    console.log("app is listeneing on port ${PORT}")
})