const axios = require('axios')
const { Types } = require('../db.js')

const getApiInfoTypes= async (req, res)=>{
    const apiU = await axios.get('https://pokeapi.co/api/v2/type')
    const finalInfo = apiU.data.results.map(e =>  e.name)
    finalInfo.forEach(e => {
        Types.findOrCreate({
            where: {
                name: e
            }
        })
    })
    res.status(200).send(finalInfo)
}

module.exports={
    getApiInfoTypes
}