import Card from "../components/Card";
import { useParams } from 'react-router';
import React, {useEffect, useState} from "react";
import axios from "axios";

const Catalog = () => {
    const { category } = useParams();
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/articles/'+category, { withCredentials: true })
            .then(res => setArticles(res.data))
            .catch(error => console.log(error))
    }, [])

    return(
        <>
            <Card articles={articles}></Card>
        </>
    )

}
export default Catalog;