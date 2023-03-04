import React from 'react'
import axios from 'axios'

export default ({id, callback}) => {

    const deleteArticle = (id) => {
        axios.delete('http://localhost:8000/api/article/delete/' + id, { withCredentials: true })
            .then(res => {
                callback();
            })
    }

    return(
        <button className='btn btn-danger' onClick={e => deleteArticle(id)}> Borrar</button>
    );
}