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
    // const pokemons =useSelector(state => state.pokemons)
    // const allPokemons = useSelector ((state)=> state.pokemons)
    console.log(pokemons ,'estado local ')
    
//    const pokemons = useSelector ((state)=> state.allPokemons)
    // console.log(pokemons.map(e=>e.types),'tipos de creados db')
    // console.log(allPokes)
//    const newasd = pokemons?.map(e=>e.types?.map(e=>e.name))
//    const type1 = pokemons ? pokemons.map(e=> e.types) : pokemons.types?.findAll(e => e.name)
    // console.log(type1 ,'aaa')
   
//    const newasd = pokemons?.map(e=>e.types?.map(e=>e.name.length[1]))
        // console.log(newasd, 'types')
    // useEffect(() =>{
    //     dispatch(getPokeByParams(id))
    // },[dispatch])

    // useEffect(() => {
    //     return function () {
    //         dispatch(cleanDetail())
    //     }
    // },[dispatch])
    
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
        <div><button className="buttonBack"><Link className="linkBack" to='/home'>Volver</Link></button></div>
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
                         <h4>Tipo:{pokemons.types? pokemons.types.map(e=> e.name):pokemons.map(e=>' '+e.type)}</h4> 
                         <h4>Ataque: {pokemons.map(e=>e.attack) }        Vida: {pokemons.map(e=>e.hp)}</h4>
                         <h4>Defensa: {pokemons.map(e=>e.defense)}  Velocidad: {pokemons.map(e=>e.speed)}</h4>
                        </div>  
                                 
             </div> : (
                <div className="loadkra">
                    <img src={LogoGif} alt="logoload" />
                </div> )}
            </div>)}

