import React, {useReducer, useState} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import image from '../img/add-image.png'

const initialState = {
    name: "",
    image: "",
    category: "cosmeticos",
    description: "",
    price:""
};

function reducer(state, action) {
    return {
        ...state,
        [action.type]: action.payload
    };
}

const Form = () => {

    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [error,setError] = useState({})
    const [seletedFile, setSeletedFile] = useState (image);
    const categories = ['Cosmeticos', 'Electrodomesticos','Cocina', 'Luminaria', 'Ferreteria', 'Jardineria', 'Climatizacion', 'Carteras']
    
    const [loaded, setLoaded] = useState(false); 

    const handleChange = (e) =>{
        const { name, value } = e.target;
        dispatch({
            type: name,
            payload: value
        });
    }
    
    const handleError = (name, msg) =>{
        setError({...error, [name]: msg, });
    }

    const onFileChange = (e) => {
        dispatch({
            type: "image",
            payload: e.target.files[0]
        });
        const [file] = e.target.files;
        const reader = new FileReader();
        reader.onloadend = ()=> setSeletedFile(reader.result);
        reader.readAsDataURL(file);
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('name', state.name)
        formData.append('image', state.image)
        formData.append('category', state.category.toLowerCase())
        formData.append('description', state.description)
        formData.append('price', state.price)
        formData.append('imgName', state.image.name)
        formData.append('userId', localStorage.getItem('userId'))
        axios.post('http://localhost:8000/api/article/new', formData, { withCredentials: true })
        .then(res=>{console.log(res)
                navigate('/articles/'+res.data.category)})
        .catch(err=>{ console.log(err.response.data.errors)
                setLoaded(true)
                let errores = [];
                let temp = err.response.data.errors;
                Object.keys(temp).forEach((e) => handleError(temp[e].path,temp[e].message))
                console.log(err.response.data.errors)
            })
    }

    return(
        <div className="container border shadow bg-light card-white-m">
            <h3>Agregar Articulo</h3>
            <form onSubmit={handleSubmit}>
                <div className = "d-flex align-items-end">
                    <div className="row justify-content-center">
                        <div>
                            <form>
                                <img src={seletedFile} alt ="article" className="img-lg mx-3" />
                                <div className="form-group">
                                    <input type="file" className="form-control-file mt-4" id="image" onChange={onFileChange}/>
                                </div>
                                {
                                loaded && error.imgUrl ?
                                <p style={{color:'red'}}>{ error.imgUrl }</p> :''
                            }
                            </form>
                        </div>
                    </div>
                    <div className="col mx-3">
                        
                        <div className="form-group ">
                            <label className="form-label" htmlFor="name">Nombre del Producto:</label>
                            <input className="form-control col-3" type="text" id="name" name="name" value= {state.name} onChange = {handleChange} />
                            {
                            error.name ?
                            <p style={{color:'red'}}>{ error.name }</p> :''
                        }
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="price">Precio:</label>
                            <input className="form-control col-1" type="number" id="price" name="price" value= {state.price} onChange = {handleChange} />
                            {
                                loaded && error.price ?
                                <p style={{color:'red'}}>{ error.price }</p> :''
                            }
                        </div>
                        <div className=''>
                            <label className="form-label" htmlFor="category">Categoria:</label>
                            <select className= "form-control" name="category" value={state.category} onChange={handleChange}>
                                {categories.map((cat, index) => 
                                    <option key={index} value={cat}>{cat}</option>
                                )}
                            </select>    
                        </div>
                        
                    </div>
                </div>
                <div className="form-group">
                        <label className="form-label" htmlFor="description">Description:</label>
                        <textarea className="form-control"  id="description" name="description" value= {state.description} onChange = {handleChange} rows= '3'/>
                    </div>
                <button type='submit' className='mt-5 btn btn-primary'>Guardar</button>
                
            </form>
        
        </div>
    );

}
export default Form;