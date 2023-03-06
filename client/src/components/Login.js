import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

const Login = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()

    const submitHandler = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:8000/api/login', {
            email, password
        }, { withCredentials:true, credentials:'include'})
        .then((res)=>{
            console.log(res)
            localStorage.setItem('userId', res.data.user._id)
            navigate('/home')
        }).catch((err)=>{
            console.log(err)
        })
    }
  return (
    <div className='container col mt-5'>
        <form onSubmit={submitHandler} className=' card card-white'>
            <h3>Login</h3> 
            <label htmlFor="" className='form-label'>Email:</label>
            <input type="text" className='form-control'onChange={(e)=>setEmail(e.target.value)}/>   
            <label htmlFor="" className='form-label'> Password</label>
            <input type="password" className='form-control'onChange={(e)=>setPassword(e.target.value)}/>
            <div className=" mt-3 d-flex justify-content-center align-self-end">
                <button className='btn btn-primary mx-5'> Login</button>
                <Link to="/register" className='mx-5 mt-3'>Registrarse</Link>
            </div>
        </form>
    </div>
  )
}

export default Login;