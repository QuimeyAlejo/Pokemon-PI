import React from "react";
import { useEffect,useState, } from "react";
import {useSelector, useDispatch} from "react-redux";
import {getPokemons, filterPokemonsByTypes,getTypes,filterCreated,orderByName, orderByAttack, orderByHp} from '../Redux/actions/actions';
import {Link} from 'react-router-dom';
import Card from "./Card";
import Paginado  from "./Paginado";
import LogoGif from '../assets/img/LogoGif.gif'
import SearchBar from '../components/SearchBar'
import PokemonCreate from "./PokemonCreate";
import '../css/Home.css'
import '../css/Card.css'
import '../css/ButtonsHome.css'
import backgroundDefault from '../assets/img/defaultCreation.png'

export default function Home (){
     const dispatch = useDispatch()
     const allPokemons = useSelector ((state)=> state.pokemons)
     const allTypes = useSelector((state)=> state.types)
     //------- estados locales----------
     const [currentPage,setCurrentPage]= useState(1);
     const [pokePerPage, setPokePerPage]= useState(12); // guardo 12 pokemones por pagina
     const [order, setOrder] = useState('')
 // -------- paginado ---------------
   const indexOfLastPokemons = currentPage * pokePerPage 
   const indexOffFirstPokemons = indexOfLastPokemons - pokePerPage 
   const currentPoke = allPokemons.slice(indexOffFirstPokemons, indexOfLastPokemons) 
   const paginado = (pageNumber)=>{
      setCurrentPage(pageNumber)
   }
   console.log(currentPoke,'currentpokes' )
//------------montaje del componente--------------//
     useEffect(()=>{
        dispatch(getPokemons()) 
        dispatch(getTypes())  
     },[dispatch])
//-------------------------------------------------------------------------//
     function handleClick(e){
        e.preventDefault(); 
        
        dispatch(getPokemons());
        setCurrentPage(1)
       }
//-------------------------------------------------------------------------//
       function handleFilterTypes(e){
         e.preventDefault();
         if(e.target.value === 'all'){
            dispatch(getPokemons())
            setCurrentPage(1)
         }else{
            dispatch(filterPokemonsByTypes(e.target.value))
         setCurrentPage(1)
         }}
  
//-------------------------------------------------------------------------//
       function handleFilterCreated(e){
         if(e.target.value === 'all'){
            dispatch (getPokemons())
         }else{
          
         dispatch(filterCreated(e.target.value))
         setCurrentPage(1)
       }  }
//-------------------------------------------------------------------------//       
       function handleOrderByName(e){
         e.preventDefault();
         if(e.target.value === 'all' ){
            dispatch(getPokemons())
         }else{
            dispatch(orderByName(e.target.value))
            setCurrentPage(1)
            setOrder(`Ordenado ${e.target.value}`)
         }
         
       }
//-------------------------------------------------------------------------//       
       function handleOrderByAttack(e){
         e.preventDefault();
         if(e.target.value === 'all'){
            dispatch(getPokemons())
         }else{
         dispatch(orderByAttack(e.target.value));
         setCurrentPage(1)
         setOrder(`Ordenado ${e.target.value}`)
       }}
//-------------------------------------------------------------------------//     
      
//--------------------------------------------------------------------------------------------------------//
     return(
        <div className="containerPri">
         <div className="navBar">
            <h1 className="pokeimage"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/250px-International_Pok%C3%A9mon_logo.svg.png"></img></h1>
             <Link  className="button2" to= '/pokemons'>Captura tu Pokemon</Link>
            <SearchBar />
            <button  className="button2" onClick={e=> {handleClick(e)}}>Volver a cargar los Pokemons</button>
         </div>
           
            <div>
               <div className="conteSelec">
                <select className="selects" onChange={e => handleOrderByName(e)}> 
                <option value='all'  >Orden Alfabetico</option>
                <option value='asc'>A - Z</option>
                <option value='des'>Z - A</option>
                </select>
                <select className="selects" onChange={e => handleOrderByAttack(e)}>
                <option value='all'>Ataque</option>
                <option value='may'>Mayor</option>
                <option value='men'>Menor</option>
                </select>
                
                <select className="selects" onChange={e => handleFilterTypes(e)}>
                    <option  value='all'  >Tipos</option>
                    {allTypes.map((e,i)=>{
                        return(
                           
                        <option key={i}>{e}</option>
                        // <option key={i}>{e}</option>
                        )
                    })
                     
                    }
                </select>
                <select  className="selects" onChange={e => handleFilterCreated(e)} >
                <option value='all'  >Todos</option>
                <option value='api'>Existentes</option>
                <option value='created'>Creados</option>               
                 </select>
                  </div>
                 <Paginado pokePerPage={pokePerPage}
                  allPokemons= {allPokemons.length}
                 paginado= {paginado}
                 />

                 <div className="countainerCards">
                {
                 currentPoke.length > 0 ? currentPoke.map((e,i)=>{
                   return(
                     <div key={i}>
                         <Link to={'/pokemons/' + e.id} className='cardlink'>                     
                         <Card name={e.name.toUpperCase()} image={e.image} attack={e.attack} types={e.types? e.types.map(e=> e.name) : e.type}/>                                                                                                    
                   </Link>
                  </div>
                   )  
                }): (
                  <div>
                     <img src={LogoGif} alt="AshGIF" />
                   </div>                 
                )
               }  
                 </div>                 
            </div>
        </div> )
        
    
}