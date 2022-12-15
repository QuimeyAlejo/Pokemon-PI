const initialState = {
    pokemons : [],
    types: [],
    allPokemons: [],
    // detail: {},
     detail: [],
} 

 function rootReducer (state= initialState,action){
    // eslint-disable-next-line default-case
 //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------//     
    switch(action.type){
        case "GET_POKEMONS":
         return {
            ...state,
            pokemons:action.payload,
            allPokemons:action.payload
         }
 //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------// 
         case 'GET_TYPES':
            return{
                ...state,
                types: action.payload
            }
 //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------//             
            case 'FILTER_BY_TYPES':
            const allPokemons = state.allPokemons.map(e =>({
        
                id: e.id,
                name: e.name,
                image: e.image,
                defense: e.defense,
                attack: e.attack,
                speed: e.speed,
                // type:e.type?.map(e=> e[0].toUpperCase()+e.slice(1)),
                types:e.type ? e.type : e.types.map(e=> e.name) 
                // types:  e.types?.map(e=> e)

                // type: e.type && e.type.map(e=> e)
           }))
           console.log(allPokemons , 'asd')
            const typesFiltered = action.payload === 'all' ? state.allPokemons : allPokemons.filter(e=>e.types && e.types.includes(action.payload))
                console.log(typesFiltered, 'asd2')
               
            return{
                ...state,
                pokemons: typesFiltered
            }
 //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------//             
             case 'FILTER_CREATED':
            //    const pokeCreated = action.payload === 'created' ? state.allPokemons.filter(e=>e.createdInDb) : state.allPokemons.filter(e=>!e.createdInDb)   
              const allPoke2 = state.allPokemons
              const filterPoke = action.payload === 'created'  ? allPoke2.filter(e=> e.createdInDb === true) : allPoke2.filter(e=> e.createdInDb !== true)
             
              
                return{
                    ...state,
                    // pokemons:action.payload === 'all' ? allPoke2 : filterPoke
                    pokemons:filterPoke
                    // pokemons:pokeCreated
            
                }
 //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------//               
              case 'ORDER_BY_NAME' :
              let sortedArr = action.payload === 'asc' ? state.pokemons.sort(function(a, b){
              
                if(a.name > b.name){
                    return 1;
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0;
            }) :
            state.pokemons.sort(function(a, b){
               
                if(a.name > b.name){
                    return -1;
                }
                if(b.name > a.name){
                    return 1;
                }
                return 0;
            })
            return{
                ...state,
                pokemons: sortedArr,
             
            } 
 //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------// 
                case 'ORDER_BY_ATTACK' :
                let sortedArrAttack = action.payload === 'may' ? state.pokemons.sort(function(a, b){
                
                if(a.name > b.name){
                    return 1;
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0;
            }) :
            state.pokemons.sort(function(a, b){
                
                if(a.name > b.name){
                    return -1;
                }
                if(b.name > a.name){
                    return 1;
                }
                return 0;
            })
            return{
                ...state,
                pokemons: sortedArrAttack,
            
            }  
 
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------//   
      case 'ORDER_BY_HP':
      let hporden= action.payload === 'life+' ? state.pokemons.sort(function(a, b){
                
        if(a.name > b.name){
            return 1;
        }
        if(b.name > a.name){
            return -1;
        }
        return 0;
    }) :
    state.pokemons.sort(function(a, b){
        
        if(a.name > b.name){
            return -1;
        }
        if(b.name > a.name){
            return 1;
        }
        return 0;
    })
    return{
        ...state,
        pokemons: hporden,
    
    }  
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------//       

            case 'GET_NAME_POKEMONS':
                return {
                    ...state,
                    pokemons:action.payload
                }
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------//                 
            case 'CLEAN_DETAIL':
                    return{
                        ...state,
                        // detail: {}
                        detail: []
                    }
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------// 
             case 'GET_POKE_BY_ID':
            return{
                ...state,
                detail: action.payload
            }       
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------// 
         

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------// 


default: 
        return state
}
    }
    


export default rootReducer;