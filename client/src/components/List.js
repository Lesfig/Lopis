import React, {useEffect} from "react";
import Delete from "../components/Delete";

const List = (props) => {
    const { articles, setArticles } = props;

    const removeFromDom = articleId => {
        setArticles(articles.filter(article => article._id !== articleId));
    }
    return(
        <>
            <table className='table'>
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Imagen</th>
                <th scope="col">Titulo</th>
                <th scope="col">Precio</th>
                <th scope="col">Categoria</th>
                <th scope="col">Accion</th>
                </tr>
            </thead>
            <tbody>
            {articles.map((article, index) => {
                return (
                    <tr>
                        <th scope="row">{index}</th>
                            <td><img src={article.imgUrl} style={{width: "40px", height:"40px"}} /></td>
                            <td>{article.name}</td>
                            <td>{article.price}</td>
                            <td>{article.category}</td>
                            <td><Delete id= {article._id} callback ={()=> removeFromDom(article._id)}/></td>
                    </tr>
                );
                        
            })}
            </tbody>
            </table>
        </>
    )

}
export default List;