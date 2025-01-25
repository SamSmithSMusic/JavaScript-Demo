import {Database} from '/api/api.js';

// Variable Declaration
const skuInput = document.querySelector("header label input");
const query = document.querySelector("button");
const skulist = document.querySelector('#skus');
const database = new Database('api/database.json');

async function main() {

    //Building database BST and balancing
    await database.initalize();

    //Building sku list from DB
    skus = database.getSKUs(database._root);
    skus.forEach(sku => {
        let option = document.createElement("option");
        option.setAttribute("value",sku);

        skulist.appendChild(option);
    });


    query.addEventListener('click',() => loadItem(skuInput.value))

    
}

// Function to dynamically load item to html file
function loadItem(sku) {
    document.querySelector("section div").setAttribute("style","display: block;");
    let item = database.searchSKU(sku, database._root);

    if (item == null) {
        throw "No Item Found";
    }

    document.querySelector(".title").innerText = item.name;
    document.querySelector(".category").innerText = item.category;
    document.querySelector(".sku").innerText = item.sku;
    document.querySelector(".pic").setAttribute("src","https://placehold.co/600x400");
    document.querySelector(".pic").setAttribute("alt","item.name");
    document.querySelector(".desc").innerText = item.desc;
    document.querySelector(".price").innerText = "$ " + item.price;
}

main();