import axios from "axios" ;



//----------------------------------------------------------------------------------------------------------//
export function getPokemons (){  //me traigo los pokemones //
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/pokemons");
        return dispatch({
            type:'GET_POKEMONS',
            payload: json.data
        })
            
        }
//----------------------------------------------------------------------------------------------------------//    
}             // me traigo los types //
    export function getTypes(){
        return async function(dispatch){
            var json= await axios.get("http://localhost:3001/types");
            return dispatch({
                type:'GET_TYPES',
                payload: json.data
            })  
        }
    }
//----------------------------------------------------------------------------------------------------------//
                // funcion para filtrar los tipos //
  export function filterPokemonsByTypes(payload){
    return {
        type: 'FILTER_BY_TYPES',
        payload
    }
 }
//----------------------------------------------------------------------------------------------------------//
 export function filterCreated(payload){
    return{
        type:'FILTER_CREATED',
        payload
    }
 }
 //-------------------------------------------  SearchBar  ---------------------------------------------------------------//
 export function getNamePokemons(name){
    console.log('asd ')
    return async function (dispatch){
        try {
            var json = await axios.get("http://localhost:3001/pokemons?name=" + name);
            return dispatch({type:'GET_NAME_POKEMONS', payload: json.data});   
        }catch (error) {
            console.log(error) }
            }
  }
//-----------------------------------------ORDENAMIENTO A-Z // Z-A -----------------------------------------------------------------//
  export function orderByName (payload){
    return{
        type:'ORDER_BY_NAME',
        payload
    }
  }
  //--------------------------------------------ORDENAMIENTO POR ATTACK--------------------------------------------------------------//
  export function orderByAttack (payload){
    return{
        type:'ORDER_BY_ATTACK',
        payload
    }
  }
    //----------------------------------------------------------------------------------------------------------//
    export function postPokemons (payload){
        return async function (dispatch){
            const response = await axios.post('http://localhost:3001/pokemons', payload)
            console.log(response)
            return response;
        }
    }
 //---------------------------------------------CLEAN DETAIL-------------------------------------------------------------//   
    export function cleanDetail(){
        return{
            type: 'CLEAN_DETAIL'
        }
    }
//----------------------------------------------------------------------------------------------------------//
    export function getPokeByParams(id){
    return async function (dispatch){
        try {
            let json = await axios.get(`http://localhost:3001/pokemons/${id.id}`)
            return dispatch({
                type: 'GET_POKE_BY_ID',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function orderByHp(payload){
    return{
        type:'ORDER_BY_HP',
        payload

    }
}
    
   