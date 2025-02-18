//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { savePokemonsToDb } = require("./src/controllers/pokemonController.js");


conn.sync({ force: false }) // No borra los datos existentes
  .then(async () => {
    console.log('📀 Base de datos sincronizada');
    await savePokemonsToDb(); // 🔹 Llama a la función para guardar Pokémon
    server.listen(3001, () => {
      console.log('✅ Servidor corriendo en el puerto 3001');
    });
  })
  .catch((err) => console.error('❌ Error sincronizando DB:', err));