import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const NewUserForm = () => {

    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [error, setError] = useState([])
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate()

    const submitHandler = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:8000/api/register', {
            firstName, lastName, email, password, confirmPassword
        }, {withCredentials:true}).then((res)=>{
            console.log(res)
            localStorage.setItem('userId', res.data.user._id)
            navigate('/home')
        }).catch((err)=>{ 
            setLoaded(true)
            let errores = [];
            let temp = err.response.data.errors;
            Object.keys(temp).forEach((e) => errores.push(temp[e].message))
            setError(errores)
        })
    }
  return (
    <div className='col-6 mt-6'>
        <form onSubmit={submitHandler} className='card card-white'>
            <h3>Register</h3>
            <ul>
                {
                 loaded ? error.map((err, index) => 
                 <li key={index} className='error'>{err}</li>
                ): ""}</ul>
            <div>
                <label htmlFor=""  className='form-label'>FirstName:</label>
                <input type="text" className='form-control' onChange={(e)=>setFirstName(e.target.value)}/>
            </div>
            <label htmlFor=""  className='form-label'>LastName:</label>
            <input type="text" className='form-control' onChange={(e)=>setLastName(e.target.value)}/>
            <label htmlFor="" className='form-label'>Email:</label>
            <input type="text" className='form-control'onChange={(e)=>setEmail(e.target.value)}/>   
            <label htmlFor="" className='form-label'> Password</label>
            <input type="password" className='form-control'onChange={(e)=>setPassword(e.target.value)}/>
            <label htmlFor="" className='form-label'> Confirm Password</label>
            <input type="password" className='form-control'onChange={(e)=>setConfirmPassword(e.target.value)}/>
            <button className='btn btn-primary mt-3'> Register</button>
        </form>
    </div>
    
  )
}

export default NewUserForm;