import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Card = (props) => {
    const {articles} = props
    const userId = localStorage.getItem('userId')
    const [likes, setLikes] = useState([])

    useEffect(() => {
            
        axios.get('http://localhost:8000/api/user/likes/'+userId, { withCredentials: true })
        .then(res => {
            setLikes(res.data)})
        .catch(error => console.log(error))
    }, [])

    const handleLike = (articleId) =>{
        axios.put('http://localhost:8000/api/user/addLike', {userId, articleId}, { withCredentials: true })
            .then(res => setLikes(res.data))
            .catch(error => console.log(error))
    }

    return(
        <>
        <div className="container body-catalog">
            <h2 className="text-center mt-5">{props.category? props.category : 'Ultimos Productos'}</h2>
            <div className=' d-flex justify-content-around flex-wrap'>
                {articles.map((article, index) => {
                    const link= '/article/' + article._id
                    return (
                        <div className="px-3 card card-catalog card-white catalog shadow" key ={index}>
                            <div className="">
                            <div className="first">
                                    
                                </div> 
                                <div className="image-div">
                                    <p className=" mt-3 par position-absolute top-0 start-0"><span className="badge badge-danger">{article.category}</span></p>
                                    <img className="image rounded border" src={article.imgUrl} alt={article.name} />
                                    <i className={likes.includes(article._id) ? 
                                    "fa fa-heart position-absolute top-0 end-0 like" : "fa fa-heart-o like position-absolute top-0 end-0"}
                                    onClick={(e)=> handleLike(article._id)}/>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <p className="par mt-2">{article.name}</p>
                                    <p className="price mt-2">{article.price} gs</p>
                                </div>
                                <Link className="btn btn-success btn-sm" to={link}>Ver detalles</Link>
                            </div>
                        </div>
                        
                        );
                        
                })}
            </div>
            </div>
        </>
    )

}
export default Card;