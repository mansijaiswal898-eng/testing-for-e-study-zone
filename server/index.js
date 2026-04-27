const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv')
const MongoDB=require('./Config/db')

const app=express();
dotenv.config();
app.use(cors());
app.use(express.json())
MongoDB();

app.use('/api/user',require('./routes/userRoute'))

app.use('/api/admin',require('./routes/adminRoute'));

app.listen(process.env.PORT,()=>{
    console.log("Server is running on http://localhost:5000");
})