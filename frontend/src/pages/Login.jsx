import '../styles/Register.css';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
   const [username, setUserName] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);
   const [success, setSuccess] =useState(false);
   const navigate = useNavigate();

const handleLogin = async(e) =>{
  e.preventDefault();

  const userData = {
    username, password
  }
  try{
    const response = await axios.post('http://127.0.0.1:8000/api/v1/token/', userData);
    localStorage.setItem('accessToken', response.data.access)
    localStorage.setItem('refreshToken', response.data.refresh)
    console.log('Login Success')
    setSuccess(true)
    navigate("/dash")

  }catch(error){
    console.error("Invalid credentials", error.response.data)
  }finally{
    setLoading(true)
  }
  clearForm();
}
 const clearForm = () => {
        setUserName(""),
        setPassword("")
     }
  return (
   
    <div className="shot">
      <h3 className='tit'>Login to Portal</h3>
    <form className='fo' onSubmit={handleLogin}>
      <label className='lab'>User Name  </label> 
      <input type='text' placeholder='username'
       className='pt' value={username} 
       onChange={(e) =>setUserName(e.target.value)} required/>
      
    <label className = 'lab'>Password </label>
      <input type='password' placeholder='**********' className ='pt' value={password}
      onChange={(e) =>setPassword(e.target.value)} required/>
      {success && <div>Registration Successful</div>} 
      <Button type ='submit' className = 'Regi' disabled ={loading}>
      {loading ? "logging in......" : "Login"}
       </Button>
     
    </form>
  </div>
  )
}

export default Login