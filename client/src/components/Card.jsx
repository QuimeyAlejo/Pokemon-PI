import React from "react";


function Card ({name, image,  attack, types,type}){
    console.log(attack, 'ataque')
    // var validateUrl = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(/|/([\w#!:.?+=&%@!-/]))?/.test(image);
    var validateUrl = /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi.test(image);
    return (
        <div className="card"> 
            <h3 className="contenidoh3"> {name} </h3>
            <br/>
            <img   src={validateUrl? image : 'https://scarletviolet.pokemon.com/_images/pokemon/sprigatito/pokemon-sprigatito.webp' } alt="Img not found" width="200px"  height='100px'/>
          
            {/* <h5 > Tipo:{types? types+' '  :type +'' }</h5> */}
            <div className="tipo" >  
              <h5  > Tipo:{types ? ' '+types + ' ' : ' '+type+ ' '}</h5>
            <br/>
           
            <h5> Ataque: {attack}</h5>   
            </div>
           
        </div>
    )
}

export default Card