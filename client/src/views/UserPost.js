import React, {useState, useEffect} from "react";
import axios from "axios";
//import Delete from "../components/Delete";
import { useNavigate } from "react-router-dom";
import List from "../components/List";

const Catalog = () => {
    const [articles, setArticles] = useState([])
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [error, setError] = useState([])
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate
    const userId = localStorage.getItem('userId')
    const is_edit = true
    

    useEffect(() => {
        if (is_edit){
            axios.get('http://localhost:8000/api/user/' + userId)
            .then(res => {
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setEmail(res.data.email);
                console.log('probando'+ res.data.title)
            })}
    }, [])

    const submitHandler = (e)=>{
        e.preventDefault()
        axios.put('http://localhost:8000/api/user/edit/'+ userId, {
            firstName, lastName, email
        }, {withCredentials:true}).then((res)=>{
            console.log(res)
            navigate('/home')
        }).catch((err)=>{ 
            setLoaded(true)
            let errores = [];
            //let temp = err.response.data.errors;
            //Object.keys(temp).forEach((e) => errores.push(temp[e].message))
            //setError(errores)
        })
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/articles_user/'+ userId, { withCredentials: true })
            .then(res => setArticles(res.data))
            .catch(error => console.log(error))
    }, [])

    const removeFromDom = articleId => {
        setArticles(articles.filter(article => article._id !== articleId));
    }

    return(
        <>
        <div className="container">
            <div className=' container card-white shadow'>
                <form onSubmit={submitHandler} className='mt-5'>
                    <h3>Editar mis datos</h3>
                    <ul>
                        {
                        loaded ? error.map((err, index) => 
                        <li key={index} className='error'>{err}</li>
                        ): ""}
                    </ul>
                    <div class="row g-3">
                        <div class="col">
                            <label htmlFor=""  className='form-label'>Nombre:</label>
                            <input type="text" className='form-control' value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                        </div>
                        <div class="col">
                            <label htmlFor=""  className='form-label'>Apellido:</label>
                            <input type="text" className='form-control' value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                        </div>
                        <div class="col">
                            <label htmlFor="" className='form-label'>Email:</label>
                            <input type="text" className='form-control' value={email} onChange={(e)=>setEmail(e.target.value)}/>   
                            <button className='btn btn-primary mt-3'>Guardar</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="container card-white shadow pb-2">
                <h2 className="text-center mt-5"> Productos subidos</h2>
                <List articles= {articles} setArticles = {setArticles} />
            </div>
            
        </div>
        </>
    )

}
export default Catalog;