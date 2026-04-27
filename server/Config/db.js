const mongoose=require('mongoose')
const MongoDB=()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Db connected");
    })
    .catch(()=>{
        console.log("Db not connected");
    })
}
module.exports=MongoDB