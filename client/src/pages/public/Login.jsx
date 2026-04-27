import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import img1 from "../../assets/user.png"
import axios from 'axios'

const Login = () => {

  const [data,setData]=useState({
      email:'',
      password:''
    })

  const navigate=useNavigate()

const handleChange=(e)=>{
      setData(()=>({...data,[e.target.name]:e.target.value}))
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
      try{
        const res= await axios.post('http://localhost:5000/api/user/login',data);
        console.log(res);
        if(res.data.msg=="Login Successfully"){
          localStorage.setItem("name",res.data.data.name)
          localStorage.setItem("email",res.data.data.email)
          localStorage.setItem("id",res.data.data.id)
          localStorage.setItem("token",res.data.data.token)
          localStorage.setItem("role",res.data.data.role)
          if(res.data.data.role=="Trainer"){
            navigate('/trainerdashboard')
          }
          else if(res.data.data.role=="Learner"){
            navigate('/userdashboard')
          }
        }
      }
      catch(er){
        console.log(er);
      }
  }

  return (
    <div id="log_form" className="mx-auto">
      <div><img src={img1} id="img1"/></div>
        <h2 className="py-4">Login form</h2><br/>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Enter email" className="but1" onChange={handleChange}/><br/><br/>
        <input type="text" name="password" placeholder="Enter password" className="but1" onChange={handleChange}/><br/><br/>
        <input type="submit" value="login" className="but2"/><br/>
        <div id="log_link">
        <div id="left"><Link to="#">forget password?</Link></div>
        <div id ="right"><Link to="/register">not registered?</Link></div>
        </div>
      </form>
    </div>
  )
}

export default Login