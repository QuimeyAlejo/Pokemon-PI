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
                    createdInDb: false,  
                }
            });

            if (created) { 
                const typeInstances = await Types.findAll({ where: { name: poke.type } });
                await newPokemon.setTypes(typeInstances);
            }
        }

        console.log("✅ Pokémon de la API guardados en la BD");
    } catch (error) {
        console.error("❌ Error guardando Pokémon en la BD:", error);
    }
};

savePokemonsToDb();

const getDbInfo = async () => {
    try {
        const dbPokemons = await Pokemon.findAll({
            include: {
                model: Types,
                attributes: ["name"],
                through: { attributes: [] },
            },
        });

        return dbPokemons.map(pokemon => ({
            ...pokemon.toJSON(),
            types: pokemon.Types ? pokemon.Types.map(t => t.name) : [], // 🔹 Evita el error
        }));
    } catch (error) {
        console.error("❌ Error obteniendo Pokémon de la BD:", error);
        return [];
    }
};


const getAllPokemons = async () => {
    try {
        const apiPokemons = await getApiInfoPokemon(); // 🔹 Obtiene los de la API
        const dbPokemons = await getDbInfo(); // 🔹 Obtiene los de la BD

        return [...dbPokemons, ...apiPokemons]; // 🔹 Combina ambas listas
    } catch (error) {
        console.error("❌ Error obteniendo todos los Pokémon:", error);
        return [];
    }
};

// 🔹 Llamar la función correctamente
getAllPokemons().then(pokemons => console.log("Todos los Pokémon:", pokemons.length));




const getAllPokesOrByQuery = async (req, res) => {
    try {
        const name = req.query.name;
        
        
        const pokemonsAPI = await getApiInfoPokemon();
        const pokemonsDB = await getDbInfo();
        const allPokes = [...pokemonsDB, ...pokemonsAPI]; 

        if (name) {
            const pokeName = allPokes.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            return pokeName.length 
                ? res.status(200).json(pokeName) 
                : res.status(404).json({ message: "Pokemon not found" });
        }

        res.status(200).json(allPokes);
    } catch (error) {
        console.error("❌ Error obteniendo los Pokémon:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};


const getPokeById = async (req, res) => {
    try {
        const { id } = req.params;

     
        if (id.includes("-")) { // Si el ID tiene un UUID, está en la BD
            const pokemonDB = await Pokemon.findOne({
                where: { id },
                include: {
                    model: Types,
                    attributes: ["name"],
                    through: { attributes: [] },
                },
            });

            if (pokemonDB) return res.status(200).json(pokemonDB);
        }

      
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokeAPI = {
            id: response.data.id,
            name: response.data.name,
            image: response.data.sprites.other.home.front_default,
            hp: response.data.stats[0].base_stat,
            attack: response.data.stats[1].base_stat,
            defense: response.data.stats[2].base_stat,
            speed: response.data.stats[5].base_stat,
            height: response.data.height,
            weight: response.data.weight,
            type: response.data.types.map(t => t.type.name),
        };

        return res.status(200).json(pokeAPI);
    } catch (error) {
        console.error("❌ Error buscando Pokémon por ID:", error);
        res.status(404).json({ error: "ID not found" });
    }
};



const createPokemon = async (req, res) => {
    try {
        let {
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            type, 
            image
        } = req.body;

        let pokeObj = {
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            image: image ? image : 'https://scarletviolet.pokemon.com/_images/pokemon/sprigatito/pokemon-sprigatito.webp',
            createdInDb: true, // 🔹 Ahora sí se guardará correctamente en la BD
        };

       
        const pokeCreated = await Pokemon.create(pokeObj);

      
        if (!Array.isArray(type)) {
            type = [type]; 
        }

       
        let typeDb = await Types.findAll({
            where: { name: type }
        });

       
        await pokeCreated.addTypes(typeDb);

        res.status(200).json({ message: '✅ Pokémon creado con éxito!', pokemon: pokeCreated });

    } catch (error) {
        console.error("❌ Error creando Pokémon:", error);
        res.status(500).json({ error: "Hubo un problema al crear el Pokémon." });
    }
};


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
