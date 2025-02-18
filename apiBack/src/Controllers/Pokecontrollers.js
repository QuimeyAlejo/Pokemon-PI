const axios = require('axios')
const { Pokemon, Types } = require('../db')


const getApiInfo = async () => {
    const apiU = await axios.get('https://pokeapi.co/api/v2/pokemon')
    const apiU2 = await axios.get(apiU.data.next)
    const allPokes = apiU.data.results.concat(apiU2.data.results)
    const finalInfo = await Promise.all(
        allPokes.map(async e =>{
            const poke = await axios.get(e.url) 
            return{
                id: poke.data.id,
                img: poke.data.sprites.other.home.front_default,
                name: poke.data.name,
                // life: poke.data.stats[0].base_stat,
                // life: poke.data.stats[0].base_stat,
                hp: poke.data.stats[0].base_stat,
                attack: poke.data.stats[1].base_stat,
                defense: poke.data.stats[2].base_stat,
                speed: poke.data.stats[5].base_stat,
                height: poke.data.height,
                weight: poke.data.weight,
                type: poke.data.types && poke.data.types.map(e =>{return' '+e.type.name[0].toUpperCase()+e.type.name.slice(1)}) // aca
                // types: poke.data.types && poke.data.types.map(e =>e.type.name)

                // types: poke.data.type && poke.data.type.map(e =>{ return  e.types.name[0].toUpperCase()+e.types.name.slice(1)})
            }
        })
    )
    return finalInfo;
}
// -------------------------------------------- Datos guardados a la db----------------------------------------------------------
const getDbInfo = async () =>{
    return await Pokemon.findAll({
        include:{
            model: Types,
            attributes: ['name'],
            through:{
                attributes: [],
        },}})}

        const getAllPokemon = async ()=> {
            const apiInfo = await getApiInfo();
            const  DbInfo = await getDbInfo();
            const infoTotal = apiInfo.concat(DbInfo);
            return infoTotal;
        
        
         }
//--------------------------------------------------------------------------------------------------------------------------------------------
const getPokeParam = async (req,res)=>{
    const {id} = req.params
   
    let pokeFound = 1
    if(id.length > 5){
     pokeFound = await Pokemon.findOne({
        where:{id},
        include : {
            model: Types,
            attributes: ["id","name"],
            through: { attributes: [] },
        }
})          // recorre la db buscando que la id sea igual que el payload
    console.log(pokeFound.dataValues ,  'dbinfo')   }                  //  poner
    else{
         pokeFound = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
         pokeFound = {
            id: pokeFound.data.id,
            name: pokeFound.data.name,
            // life: pokeFound.data.stats[0]["base_stat"], 
             hp: pokeFound.data.stats[0]["base_stat"],
            attack: pokeFound.data.stats[1]["base_stat"],
            defense: pokeFound.data.stats[2]["base_stat"],
            speed: pokeFound.data.stats[5]["base_stat"],
            height: pokeFound.data.height,
            weight: pokeFound.data.weight,
            image: pokeFound.data.sprites.other.dream_world.front_default,
            // type: pokeFound.data.type.map(t => t.type) // aca remplace types x type
            // types: pokeFound.data.types.map(t => t.types) 
            type: pokeFound.data.types.map(t => t.name) 

    } }
    res.send(pokeFound)
   
 }    
 const  pokeQuery = async (req,res)=>{   
    const {name} = req.query
    const pokeTotal = await getAllPokemon();
    if (name){
        const pokeName = await pokeTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase())) 
        pokeName.length ? res.status(200).send(pokeName) : res.status(404).send('Koquemon no encontrado :(');
    }else{
         res.status(200).send(pokeTotal)
    }
}

// const pokeCreate = async(res,req)=>{
   
//                 const { image, life, defense, attack, weight,height, type } = req.body;
//         let pokeObj = {name, life, defense, attack, weight,height, image: image ? image : 'https://scarletviolet.pokemon.com/_images/pokemon/sprigatito/pokemon-sprigatito.webp' }
    
//         try {
//             const pokeCreated = await Pokemon.create(pokeObj)
//             let typesDb = await Types.findAll({
//                 where: { name: type  }
//             })
    
//             pokeCreated.addTypes(typesDb)
//             res.status(200).send('Pokemon creado con exito!')
//         }
//         catch (error) {
//             console.log(error)
//             res.status(404).send(error)
//         }
//     }
const pokeCreate = async (req, res) => {
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

module.exports = {
    getPokeParam,
    pokeQuery,
    pokeCreate
}