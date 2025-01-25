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

    //Fetch items from json
    async loadItems() {
        const jsonReply = await fetch(this.path);
        // console.log(jsonReply);
        const items = await jsonReply.json();   
        return items;
    }

    //turn items into Items
    buildDatabase(objects) {
        var sortedObjects = objects.sort((a,b) => a.SKU - b.SKU);
    
        var preNodes = sortedObjects.map(item => {
            return new Item(item.SKU,item.Title,item.ShortDescription,item.Category,item.PictureURL,item.Price)
        })
    
        //build BST from items for searching
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

    //return sku array to main for input selection
    getSKUs(database) {
        let skus = [];
        
        function traversal(database) {
            if (database === null) return;
            
            traversal(database.left);  
            skus.push(database.sku);  
            traversal(database.right); 
        }
        
        traversal(database);
        return skus;
    }

    //searches for a specific item from a given sku
    searchSKU(sku, database ) {
        if (database == null) {return null}
        if (sku == database.sku) {
            return database;
        }
        if (sku < database.sku) {
            return this.searchSKU(sku, database.left)
        }
        else {
            return this.searchSKU(sku, database.right)
        }
    }
}