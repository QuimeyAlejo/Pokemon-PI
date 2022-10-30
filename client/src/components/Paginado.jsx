import React from "react";
import  "../css/Paginado.css"


export default function Paginado ({pokePerPage, allPokemons,paginado}){
    const pageNumbers = []

    for(let i=1 ; i<= Math.ceil(allPokemons/pokePerPage);i++){
        pageNumbers.push(i)
    }

    return(
        <nav className="paginado">
            <ul className="ulPaginado" >
            {pageNumbers && 
            pageNumbers.map(num=>(
                <button className="numeroPaginado" key={num} 
                 onClick={()=> paginado(num)}>{num}  </button>
               
            ),)}
           
            </ul>
        </nav>
    ) 
}