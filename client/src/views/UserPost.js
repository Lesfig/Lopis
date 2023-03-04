import React, {useState, useEffect} from "react";
import axios from "axios";
import Delete from "../components/Delete";
import { useNavigate } from "react-router-dom";

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
        <div className="d-flex">
        <div className='col-6 mt-6'>
        <form onSubmit={submitHandler} className='perfil'>
            <h3>PERFIL</h3>
            <ul>
                {
                 loaded ? error.map((err, index) => 
                 <li key={index} className='error'>{err}</li>
                ): ""}</ul>
            <div>
                <label htmlFor=""  className='form-label'>Nombre:</label>
                <input type="text" className='form-control' value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
            </div>
            <label htmlFor=""  className='form-label'>Apellido:</label>
            <input type="text" className='form-control' value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
            <label htmlFor="" className='form-label'>Email:</label>
            <input type="text" className='form-control' value={email} onChange={(e)=>setEmail(e.target.value)}/>   
            <button className='btn btn-primary mt-3'>Guardar</button>
        </form>
    </div>
        <div>
            <h2 className="text-center"> Productos subidos</h2>
            <div className=' d-flex justify-content-around flex-wrap'>
                {articles.map((article, index) => {
                    return (
                        <div className="px-3 card card-catalog card-white catalog shadow">
                            <div className="">
                            <div class="first">
                                    
                                </div> <img className="img-fluid rounded thumbnail-image border" src={article.imgUrl} alt={article.name} />
                                <div className="d-flex align-items-center">
                                <p className="par mt-2">{article.name}</p>
                                <p className="price mt-2">{article.price} gs</p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center pb-1 my-2">  
                                    <Delete id= {article._id} callback ={()=> removeFromDom(article._id)}/>
                                    <div className="like"><i class="fa fa-heart-o"></i></div>
                                </div>
                            </div>
                        </div>
                        
                        );
                        
                })}
            </div>
            </div>
            </div>
        </>
    )

}
export default Catalog;