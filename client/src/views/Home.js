import React, {useReducer} from "react";
import axios from "axios";
import {useNavigate, Link} from 'react-router-dom'


const Home = () => {
    return(
        <>
            <div className="container d-flex justify-content-around align-items-center flex-wrap">
                <div className="card card-white-m shadow">
                    <div className="card-body">
                        <img className="d-flex img-sm " src={require('../img/cocina.png')} alt="cocina" />
                        <h4 className="text-center mt-4">Cocina</h4>
                        <div className="d-flex justify-content-center">
                            <Link to="/articles/cocina" className="btn btn-outline-info btn-sm">
                                Ver
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card card-white-m shadow">
                    <div className="card-body ">
                        <img className="d-flex img-sm justify-content-center " src={require('../img/electrodomesticos.png')} alt="electrodomesticos" />
                        <h4 className="text-center mt-3">Electrodomesticos</h4>
                        <div className="d-flex justify-content-center">
                        <Link to="/articles/electrodomesticos" className="btn btn-outline-info btn-sm">
                            Ver
                        </Link>
                        </div>
                    </div>
                </div> 
                <div className="card card-white-m shadow">
                    <div className="card-body">
                        <img className="d-flex img-sm" src={require('../img/ventilador.png')} alt="ventilacion" />
                        <h4 className="text-center mt-3">Climatizacion</h4>
                        <div className="d-flex justify-content-center">
                            <Link to="/articles/climatizacion" className="btn btn-outline-info btn-sm">
                                Ver
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card card-white-m shadow">
                    <div className="card-body">
                        <img className="d-flex img-sm" src={require('../img/tornillo.png')} alt="ferreteria" />
                        <h4 className="text-center mt-3">Ferreteria</h4>
                        <div className="d-flex justify-content-center">
                            <Link to="/articles/ferreteria" className="btn btn-outline-info btn-sm">
                                Ver
                            </Link>
                        </div>
                    </div>
                </div>      
            </div>
            <div className="container d-flex justify-content-around flex-wrap">
            <div className="card card-white-m shadow">
                <div className="card-body">
                    <img className="d-flex img-sm" src={require('../img/cartera.png')} alt="cartera" />
                    <h4 className="text-center mt-3">Carteras</h4>
                    <div className="d-flex justify-content-center">
                        <Link to="/articles/carteras" className="btn btn-outline-info btn-sm">
                            Ver
                        </Link>
                    </div>
                </div>
            </div>
            <div className="card card-white-m shadow">
                <div className="card-body">
                    <img className="d-flex img-sm" src={require('../img/locion.png')} alt="cosmeticos" />
                    <h4 className="text-center mt-3">Cosmeticos</h4>
                    <div className="d-flex justify-content-center">
                        <Link to="/articles/cosmeticos" className="btn btn-outline-info btn-sm">
                            Ver
                        </Link>
                    </div>
                </div>
            </div> 
            <div className="card card-white-m shadow">
                <div className="card-body">
                    <img className="d-flex img-sm" src={require('../img/agricultura.png')} alt="jardineria" />
                    <h4 className="text-center mt-3">Jardineria</h4>
                    <div className="d-flex justify-content-center">
                        <Link to="/articles/jardineria" className="btn btn-outline-info btn-sm">
                            Ver
                        </Link>
                        </div>
                </div>
            </div>
            <div className="card card-white-m shadow">
                <div className="card-body">
                    <img className="d-flex img-sm" src={require('../img/tungsteno.png')} alt="iluminaria" />
                    <h4 className="text-center mt-3">Luminaria</h4>
                    <div className="d-flex justify-content-center">
                        <Link to="/articles/luminaria" className="btn btn-outline-info btn-sm">
                            Ver
                        </Link>
                    </div>
                </div>
            </div>      
        </div>
    </>
    );

}
export default Home;