const { Router } = require('express');
const { getTypes } = require('../Controllers/Typescontrollers');
const { pokeQuery, getPokeParam,pokeCreate } = require('../Controllers/Pokecontrollers');
const {Pokemon , Types} = require('../db')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
router.get('/types', getTypes)
router.get('/pokemons', pokeQuery)
router.get('/pokemons/:id',getPokeParam )
router.post('/pokemons', pokeCreate)