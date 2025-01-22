// export async function main() {
//     const preObjects = await loadItems();
//     const database = await buildDatabase(preObjects); 

//     // preObjects.forEach(item => {
        
//     //     var tempitem = new Item(item.SKU,item.Title,item.ShortDescription,item.Category,item.PictureURL,item.Price);
//     //     database.push(tempitem);

//     // });
//     console.log(database);

// }
// main();


export class Item {
    constructor(sku, name, desc, category, picture, price) {
        this.sku = sku,
        this.name = name,
        this.desc = desc,
        this.category = category,
        this.picture = picture,
        this.price = price
        this.left = null;
        this.right = null;
    }
}

export class Database {
    constructor (path) {
        this.path = path;
    }

    async initalize() {
        this._root = this.buildDatabase(await this.loadItems());
    }

    async loadItems() {
        const jsonReply = await fetch(this.path);
        // console.log(jsonReply);
        const items = await jsonReply.json();   
        return items;
    }

    buildDatabase(objects) {
        var sortedObjects = objects.sort((a,b) => a.SKU - b.SKU);
    
        var preNodes = sortedObjects.map(item => {
            return new Item(item.SKU,item.Title,item.ShortDescription,item.Category,item.PictureURL,item.Price)
        })
    
        function buildTree(start,end) {
            if (start > end) {
                return null
            }
    
            let mid = Math.floor((start+end) /2);
            let node = preNodes[mid];
    
            node.left = buildTree(start, mid - 1);
            node.right = buildTree(mid + 1, end);
    
            return node;
        }
        return buildTree(0, preNodes.length - 1);
    }

    searchSKU(sku, database) {
        if (database == null) {return null}
        if (sku == database.SKU) {
            return database;
        }
        if (sku < database.sku) {
            searchSKU(sku, database.left)
        }
        else {
            searchSKU(sku, database.right)
        }
    }
}