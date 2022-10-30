const axios = require('axios')
const { Pokemon, Types } = require('../db.js')

const getApiInfoPokemon = async ()=>{
    const apiU = await axios.get('https://pokeapi.co/api/v2/pokemon')
    const apiU2 = await axios.get(apiU.data.next)
    const allPokes = apiU.data.results.concat(apiU2.data.results)
    const finalInfo = await Promise.all(
        allPokes.map(async e =>{
            const poke = await axios.get(e.url) 
            return{
                id: poke.data.id,
                image: poke.data.sprites.other.home.front_default,
                name: poke.data.name,
                hp: poke.data.stats[0].base_stat,
                attack: poke.data.stats[1].base_stat,
                defense: poke.data.stats[2].base_stat,
                speed: poke.data.stats[5].base_stat,
                height: poke.data.height,
                weight: poke.data.weight,
                // type: poke.data.types && poke.data.types.map(e =>{ return ' '+e.type.name[0].toUpperCase()+e.type.name.slice(1)+''})
                type: poke.data.types && poke.data.types.map(e =>e.type.name)
                // types: poke.data.types && poke.data.types.map(e =>{ return ' '+e.type.name[0].toUpperCase()+e.type.name.slice(1)+''})
            }
        })
    )
    return finalInfo;
}


const getDbInfo = async () =>{
    return await Pokemon.findAll({
        include:{
            model: Types,
            attributes: ['name'],
            through:{
                attributes: [],
            },
        }
    })
}


const getAllPokemons = async () => {
    const apiInfo = await getApiInfoPokemon();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}


const getAllPokesOrByQuery = async (req, res)=>{
    const name = req.query.name;
    const allPokes = await getAllPokemons();
    if(name){
        const pokeName = await allPokes.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        pokeName.length ? res.status(200).send(pokeName) : res.status(404).send('Pokemon not found');
    }else{
        res.status(200).send(allPokes)
    }
}


const getPokeById = async (req, res)=>{
    const {id} = req.params;
    const pokesId = await getAllPokemons();
    let pokesFilter = pokesId.filter(e => e.id == id)
    if(pokesFilter.length > 0){
        return res.status(200).send(pokesFilter)
    }else{
        res.status(404).send('Id not found')
    }
}


const createPokemon = async (req, res) => {
    let{
        id,
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        type,
        image
    } = req.body

    let pokeObj = {
        id,
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        image: image ? image :  'https://scarletviolet.pokemon.com/_images/pokemon/sprigatito/pokemon-sprigatito.webp',
        

        
    }
    try {
        const pokeCreated = await Pokemon.create(pokeObj)
        let typeDb = await Types.findAll({
            where:{
                name: type
            }

        })
        pokeCreated.addTypes(typeDb)
        res.status(200).send('Pokemon creado con éxito!')
    } catch (error) {
        res.status(404).send(error)
    }
}

//---------------------------------------------------- delete ---------------------------------------------------------

module.exports = {
    createPokemon,
    getAllPokesOrByQuery,
    getPokeById
    }