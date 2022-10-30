import React from "react";
import { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNamePokemons } from "../actions/actions";
import '../css/SearchBar.css'

function SearchBar (setCurrentPage){
    const dispatch = useDispatch();
    const [name, setName] = useState("")
    const allPk= useSelector(state => state.allPokemons)
  
    function handleInputChange(e){
      e.preventDefault()
      setName (e.target.value) 
      
      
    }
  
    function handleSubmit(e){
      e.preventDefault()
      console.log(name)
     
      
      const pokeFilter = allPk.filter(pk => pk.name.includes(name))
      console.log(pokeFilter, 'searchbar')
      if(name && (!pokeFilter || pokeFilter.length === 0)){
          alert('No existe el pokemon ingresado!')
      }
      
      else if(!name){
          alert('¡Para buscar ingrese un nombre!')
      }
      else{
        dispatch( getNamePokemons(name))
          setName('')
          // setCurrentPage(1)
      }
    }
   
    return (
     <div className="princ">
        <div className="topnav" >
      <input 
      value={name}
        type='text' 
        placeholder='Buscador de Pokemones' 
        onChange={(e)=> handleInputChange(e)}/>
        <button className="buttonSearch" onClick={(e) => handleSubmit(e)}></button>
          </div>
     </div>
    )
  
  }
  
  export default SearchBar
