import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const List = (props) => {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/articles/'+props.category, { withCredentials: true })
            .then(res => setArticles(res.data))
            .catch(error => console.log(error))
    }, [])


    const removeFromDom = articleId => {
        setArticles(articles.filter(article => article._id !== articleId));
    }

    const Capitalize= (str) =>{
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return(
        <>
        <div className="container body-catalog">
            <h2 className="text-center mt-5">{props.category? props.category : 'Ultimos Productos'}</h2>
            <div className=' d-flex justify-content-around flex-wrap'>
                {articles.map((article, index) => {
                    const link= '/article/' + article._id
                    return (
                        <div className="px-3 card card-catalog card-white catalog shadow">
                            <div className="">
                            <div class="first">
                                    
                                </div> 
                                <div className="image-div">
                                    <img className="image rounded border" src={article.imgUrl} alt={article.name} />
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <p className="par mt-2">{article.name}</p>
                                    <p className=" mt-2 par"><span className="badge badge-success">{article.category}</span></p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center pb-1 my-2">
                                <p className="price mt-2">{article.price} gs</p>
                                    
                                </div>
                                <Link className="btn btn-primary btn-sm" to={link}>Ver detalles</Link>
                            </div>
                        </div>
                        
                        );
                        
                })}
            </div>
            </div>
        </>
    )

}
export default List;