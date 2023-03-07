import React, { useState, useEffect} from "react";
import axios from "axios";
import {useParams} from 'react-router-dom'


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
        <div className="container border shadow bg-light card-white-m col-4 ">
            
                <div >
                    <h2 style={{textAlign: "center"}}>{article.name}</h2>
                    <div className="d-flex justify-content-center">
                        <img src={article.imgUrl} alt ="article" className="my-2 img-f" />
                    </div>
                    <div className="">
                        <p>Precio:{article.price}</p>
                        <p>Categoria: {article.category}</p>
                        <p>Descripcion: {article.description}</p>
                    </div>
                    
                </div>
                </div>
    );

}
export default Show;