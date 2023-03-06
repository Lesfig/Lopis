import Card from "../components/Card";
import React, {useEffect, useState} from "react";
import axios from "axios";

const LastArticle = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/articles', { withCredentials: true })
            .then(res => setArticles(res.data))
            .catch(error => console.log(error))
    }, [])

    return(
        <>
            <Card articles={articles}></Card>
        </>
    )

}
export default LastArticle;