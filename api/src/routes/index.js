const { Router } = require('express');
const { getAllPokesOrByQuery, createPokemon, getPokeById } = require ('../controllers/pokemonController');
const { getApiInfoTypes } = require('../controllers/typesController');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//             

router.get('/pokemons', getAllPokesOrByQuery)

router.get('/types', getApiInfoTypes)

router.post('/pokemons', createPokemon)

router.get('/pokemons/:id', getPokeById)


    
module.exports = router;

