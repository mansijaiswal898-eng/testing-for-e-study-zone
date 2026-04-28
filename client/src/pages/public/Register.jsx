import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [data,setData]=useState({
    name:'',
    email:'',
    password:'',
    qualification:'',
    role:''
  })

  const handleChange=(e)=>{
      setData(()=>({...data,[e.target.name]:e.target.value}))
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
      try{
        const res=axios.post('https://testing-for-e-study-zone.onrender.com/api/user/register',data);
        window.alert("Registered Successfully");
      }
      catch(er){
        console.log(er);
        alert("Sorry try again later")
      }
  }

  return (
    <div id="reg_form" className='mx-auto'>
      <h2 className='p-5'>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Enter name" className="but1" onChange={handleChange}/><br/><br/>
        <input type="email" name="email" placeholder="Enter email" className="but1" onChange={handleChange}/><br/><br/>
        <input type="text" name="password" placeholder="Enter password" className="but1" onChange={handleChange}/><br/><br/>
        <label htmlFor=''>Qualification : </label>
        <select name="qualification" onChange={handleChange}>
          <option value="">select</option>
          <option value="B.Tech">B.Tech</option>
          <option value="M.Tech">M.Tech</option>
          <option value="BCA">BCA</option>
          <option value="MCA">MCA</option>
        </select>
        <br/><br/>
        Select Role:
        <select name="role" onChange={handleChange}>
          <option value="">select</option>
          <option value="Trainer">Trainer</option>
          <option value="Learner">Learner</option>
        </select>
        <br/><br/>
        <input type="submit" className="but2 mb-3"/><br/>
        <span>already have an accout ? </span>
        <Link to="/"> login here</Link>
      </form>
    </div>
  )
}

export default Register