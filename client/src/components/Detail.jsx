import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokeByParams, cleanDetail } from '../actions/actions'
import { useEffect } from "react";
import '../css/Detail.css'
import LogoGif from '../img/LogoGif.gif'
import img from '../img/defaultCreation.png'


export default function Detail(id){
    const dispatch = useDispatch();
    const pokemons = useSelector(state => state.detail)
    var validateUrl = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(pokemons.image);
    console.log(pokemons ,'estado local ')
    

    
    useEffect(() =>{
        dispatch(getPokeByParams(id))
    },[dispatch])

    useEffect(() => {
        return function () {
            dispatch(cleanDetail())
        }
    },[dispatch])

return(
    <div className="fondoDetail">
        <div><button className="buttonBack"><Link className="linkBack" to='/home'>Back</Link></button></div>
        {
             pokemons.length > 0 ?
          
            <div className="cuerpo">
                    <div >
                        <h1 className="tipo">{pokemons.map(e=>e.name)}</h1>
                      
                    </div>
                    <br/>
                    <div  >
                        <img className="imagen" src={pokemons? pokemons.map(e=>e.image) : img} alt="logoimg"  />
                       </div>  
                        <div  className="tipo">
                         <h4>Type:{pokemons.type? pokemons.type.map(e=> e.name):pokemons.map(e=>' '+e.type)}</h4> 
                         <h4>Attack: {pokemons.map(e=>e.attack) }        Life: {pokemons.map(e=>e.hp)}</h4>
                         <h4>Defence: {pokemons.map(e=>e.defense)}  Speed: {pokemons.map(e=>e.speed)}</h4>
                        </div>  
                                 
             </div> : (
                <div className="loadkra">
                    <img src={LogoGif} alt="logoload" />
                </div> )}
            </div>)}

