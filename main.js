import {Database} from '/api/api.js';

async function main() {
    const database = new Database('api/database.json')
    await database.initalize();
    console.log(database._root);



    
}

main();