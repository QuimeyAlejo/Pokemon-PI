import React from "react";
import {Link} from "react-router-dom";
import '../css/landingPage.css';

export default function LandingPage(){
    
    return(
        
        <div className="Landing">
            {/* <span>{alert('¡Presione en boton de la pokebola para ingresar!')} </span> */}
            <h1 className="nombre"> </h1>
            {/* <span>Hola maestro pokemon...</span>
            <br/>
            <span> haz click en la pokebola para dirigirte a la wiki!! </span> */}
            <br/>
            <Link to='/home'>
                <button className="button"></button>
            </Link>
        </div>
    )
}