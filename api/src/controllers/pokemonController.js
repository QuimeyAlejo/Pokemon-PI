const { Pokemon, Types } = require("../db.js");
const axios = require('axios');

const getApiInfoPokemon = async () => {
    try {
        const apiU = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=50'); // 🔹 Trae más Pokémon
        const allPokes = apiU.data.results;

        const finalInfo = await Promise.all(
            allPokes.map(async (e) => {
                const poke = await axios.get(e.url);
                return {
                    id: poke.data.id,
                    name: poke.data.name,
                    image: poke.data.sprites.other.home.front_default,
                    hp: poke.data.stats[0].base_stat,
                    attack: poke.data.stats[1].base_stat,
                    defense: poke.data.stats[2].base_stat,
                    speed: poke.data.stats[5].base_stat,
                    height: poke.data.height,
                    weight: poke.data.weight,
                    type: poke.data.types.map(t => t.type.name), 
                };
            })
        );

        return finalInfo;
    } catch (error) {
        console.error("❌ Error obteniendo datos de la API:", error);
        return [];
    }
};

// 🔹 Función para guardar los Pokemon en la base de datos
const savePokemonsToDb = async () => {
    try {
        const pokemons = await getApiInfoPokemon(); 

        for (const poke of pokemons) {
            const [newPokemon, created] = await Pokemon.findOrCreate({
                where: { name: poke.name }, 
                defaults: {
                    hp: poke.hp,
                    attack: poke.attack,
                    defense: poke.defense,
                    speed: poke.speed,
                    height: poke.height,
                    weight: poke.weight,
                    image: poke.image,
                }
            });

            if (created) { 
                const typeInstances = await Types.findAll({ where: { name: poke.type } });
                await newPokemon.setTypes(typeInstances);
            }
        }

        console.log("✅ Pokemon de la API guardados en la BD");
    } catch (error) {
        console.error("❌ Error guardando Pokemon en la BD:", error);
    }
};

savePokemonsToDb();

const getAllPokesOrByQuery = async (req, res)=>{
    const name = req.query.name;
    const allPokes = await getApiInfoPokemon();
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

const pokeCreate = async (req, res) => {
    let{
    
        name,
      //  life, 
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        type,
        img,
        createInDb,
    } = req.body

    let pokeObj = {
      
        name,
        hp,
       // life,
        attack,
        defense,
        speed,
        height,
        weight,
        // image
        img: img ? img : 'https://scarletviolet.pokemon.com/_images/pokemon/sprigatito/pokemon-sprigatito.webp'
    }
    try {
        const pokeCreated = await Pokemon.create(pokeObj)
        let typeDb = await Types.findAll({
            where:{
                name: type
            }

        })
        pokeCreated.addType(typeDb)
        res.status(200).send('Pokemon creado con éxito!')
    } catch (error) {
        res.status(404).send(error)
    }
    console.log(pokeCreate , 'pokemon ')
}

//---------------------------------------------------- delete ---------------------------------------------------------

module.exports = {
    createPokemon,
    getAllPokesOrByQuery,
    getPokeById,
    savePokemonsToDb  
};
