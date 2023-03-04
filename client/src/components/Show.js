import React, { useState, useEffect} from "react";
import axios from "axios";
import {useNavigate, useParams} from 'react-router-dom'


const Show = () => {
    const { id } = useParams();
    const [article,setArticle] = useState({}) 

    useEffect(() => {
        
            axios.get('http://localhost:8000/api/article/' + id)
            .then(res => {setArticle(res.data)
            console.log(article)})
            .catch(error => console.log(error)
            )
    }, [])

    return(
        <div className="container border shadow bg-light db-flex card-white-m">
            
                <div className = "d-flex align-items-end">
                    <img src={article.imgUrl} alt ="article" className="img-lg mx-3" />
                    <div className="row justify-content-center">
                        <p>Nombre del producto: {article.name}</p>
                        <p>Precio:{article.price}</p>
                        <p>Categoria: {article.category}</p>
                        <p>Descripcion: {article.description}</p>
                    </div>
                    
                </div>
                </div>
    );

}
export default Show;