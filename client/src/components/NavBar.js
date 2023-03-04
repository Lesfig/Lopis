import React from 'react'
import axios from 'axios'
import { useNavigate, NavLink } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();

    const logout = e => {
        e.preventDefault()
        axios.get('http://localhost:8000/api/logout', {withCredentials:true})
            .then(res => navigate('/login'))
            .catch(error => console.log(error))
    }

    return(
        <div className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark"> 
            <NavLink to="/" className="navbar-brand"> LOPIS </NavLink>
            
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/articles/">Productos recientes</NavLink >
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/article/new">Nuevo Producto</NavLink >
                    </li>
                </ul>
                
            </div>
            <ul className="navbar-nav">
                
                <li className="nav-item">
                        <NavLink className="nav-link" to="/myarticles">Mi cuenta<i class="fa fa-user-circle-o"></i></NavLink >
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login" onClick={logout}>Logout <i class="fa fa-sign-out"></i></NavLink >
                    </li>
            </ul>
            
        </div>
    );
}
export default NavBar;