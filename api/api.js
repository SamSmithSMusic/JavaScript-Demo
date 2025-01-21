async function main() {
    const database = await loadDatabase();
    console.log(database.map((item) => {
        return item.SKU + " : " + item.Title;
    }));
}
main();

async function loadDatabase() {
    const jsonReply = await fetch('api/database.json');
    console.log(jsonReply);
    const items = await jsonReply.json();
    return items;
}