const axios = require('axios')
const { Pokemon, Types } = require('../db')



const getTypes = async (req, res) => {
    try {
        let findTypesDb = Types.findAll()
        if(findTypesDb.length > 0){
            res.status(200).send(findTypesDb.map(d => d.name))
        }else{
            const apiUrl = await axios.get('https://pokeapi.co/api/v2/type')
            const infoApiUrl = apiUrl.data.results.map(g => g.name)
            infoApiUrl.forEach(types => {
                Types.findOrCreate({
                    where: {name: types}
                })
            })
            console.log(infoApiUrl, 'sss')
            let otraInfo = await Types.findAll()
            let utilInfo = otraInfo.map(d => d.name)
            console.log(utilInfo.length)
            res.status(200).send(utilInfo)
        }

    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getTypes
}