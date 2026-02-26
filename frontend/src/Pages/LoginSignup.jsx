import { useState } from 'react';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
  
  const [state,setState] = useState("Login")
  const [formData,setFormData] = useState({
    username : "",
    password : "",
    email : ""
  })
  const changeHandelar =(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login = async()=>{
    console.log("Login function execuated!!!",formData)
    let responseData;
    await fetch('http://localhost:5001/login',{
      method:'POST',
      headers:{
        Accept:'application/formdata',
        'content-type':'application/json'
      },
      body: JSON.stringify(formData)
    }).then((response) => response.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors)
    }
  }

  const signup = async()=>{
    console.log("Sign Up function execuated!!!",formData)
    let responseData;
    await fetch('http://localhost:5001/signup',{
      method:'POST',
      headers:{
        Accept:'application/formdata',
        'content-type':'application/json'
      },
      body: JSON.stringify(formData)
    }).then((response) => response.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors)
    }
  }
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up"?<input name='username' value={formData.username} onChange={changeHandelar} type="text" placeholder='Your Name'/>:<></>}
          <input name='email' value={formData.email} onChange={changeHandelar} type="email" placeholder='Your Email'/>
          <input name='password' value={formData.password} onChange={changeHandelar} type="password" placeholder='Your Password'/>
        </div>
        <button onClick={()=> {state === "Login"?login():signup()}}>Continue</button>
        {state === "Sign Up" ?<p className='loginsignup-login'>Already have an account? <span onClick={()=>{setState("Login")}} className='toggle-link'>Login</span ></p>:<p className='loginsignup-login'>Create an account <span onClick={()=>{setState("Sign Up")}} className='toggle-link'>Sign Up</span></p>}
        
        {state === "Sign Up"?<div className="loginsignup-agree">
          <input type="checkbox" name='' id=''/>
          <p>I agree to the Terms & Conditions</p>
        </div>:<></>}
      </div>
    </div>
  );
};

export default LoginSignup;
