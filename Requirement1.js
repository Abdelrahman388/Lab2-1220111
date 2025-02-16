var inventory = [], transaction = [], category = [], fields = {};

//function doStuff(a, b) {
    // if (["add", "edit", "removeItem"].includes(a)) {
    //     if (a === "add") {
    //         var item = { name: b[0], category: b[1], quantity: b[2], prc: b[3], unit: b[4], added: new Date(), customField: b[5] || {} };
    //         inventory.push(item);
    //         if (!category.includes(b[1])) category.push(b[1]);
    //         transaction.push({ type: "add", item });
    //     } else if (a === "edit" && i[b[0]]) {
    //         t.push({ type: "edit", old: i[b[0]], new: b.slice(1) });
    //         i[b[0]] = { ...i[b[0]], n: b[1], cat: b[2], qty: b[3], prc: b[4], unt: b[5], custF: b[6] || {} };
    //     } else if (a === "removeItem" && i[b[0]]) {
    //         t.push({ type: "delete", itm: i[b[0]] });
    //         i.splice(b[0], 1);
    //     }
    //     console.log("=== Dashboard ===\nItems: " + i.length + "\nTotal: $" + i.reduce((tot, x) => tot + x.qty * x.prc, 0).toFixed(2) + "\nCats: " + c.join(', '));
    // }
    // if (["Sale", "restock"].includes(a)) {
    //     for (let item of inventory) {
    //         if (item.name === b[0]) {
    //             if (a === "Sale" && item.quantity >= b[1]) {
    //                 item.quantity -= b[1];
    //                 transaction.push({ type: "sale", item: item, qtyS: item[1], d: new Date() });
    //                 console.log(`Sold ${b[1]} ${item.unit} of ${item.name}`);
    //             } else if (a === "restock") {
    //                 k.qty += b[1];
    //                 t.push({ type: "restock", itm: k, qtyR: b[1], d: new Date() });
    //                 console.log(`Restocked ${b[1]} ${k.unit} of ${k.n}`);
    //             }
    //             break;
    //         }
    //     }
    // }
    //if (a === "search") console.log(i.filter(x => [x.n, x.cat, x.prc].some(v => v.toString().toLowerCase().includes(b[0].toLowerCase()))));
    //if (a === "viewInventory") console.log("=== Inventory ===", i);
    //if (a === "exportAll") console.log("CSV:\n" + ["Name,Category,Quantity,Price,Unit,AddedAt"].concat(i.map(x => Object.values(x).join(','))).join('\n'));
    //if (a === "viewAllTransactions") console.log("Transactions:\n", t);
    //if (a === "viewItemAge") console.log(i.map(x => `${x.n}: ${Math.floor((new Date() - new Date(x.added)) / (1000 * 60 * 60 * 24))}d`).join('\n'));
    //if (a === "Import") b[0].forEach(x => doStuff("add", [x.n, x.cat, x.quantity, x.price, x.unit]));
    //if (a === "addCustomField" && !f[b[0]]) f[b[0]] = null;
    //if (a === "updateCustomField") i.find(x => x.n === b[0])?.custF[b[1]] = b[2];
//}

function addItem(item){
    var newItem = { name: item[0], category: item[1],
                    quantity: item[2], price: item[3], 
                    unit: item[4], added: new Date(), 
                    customField: item[5] || {} };
    inventory.push(newItem);
    if (!category.includes(item[1])) category.push(item[1]);
    transaction.push({ type: "add", newItem });
    console.log("=== Dashboard ===\nItems: " + inventory.length + 
                "\nTotal: $" + inventory.reduce((total, x) => tot + x.quantity * x.pricec, 0).toFixed(2) + 
                "\nCats: " + c.join(', '));
} 

function editInventory(item){
    if ( incentory[item[0]]) {
        transaction.push({ type: "edit", old: inventory[item[0]], new: b.slice(1) });
        inventory[item[0]] = { ...inventory[item[0]], name: item[1], 
                                category: item[2], quantity: item[3],
                                price: item[4], unit: item[5], 
                                custF: item[6] || {} };
    }
}

function removeItem(item){
    transaction.push({ type: "delete", item: inventory[item[0]] });
    inventory.splice(item[0], 1);
    lowStockAlert(item)
}

function sale(item){
    for (let inventoryItem of inventory) {
        if (inventoryItem.name === item[0] && inventoryItem.quantity >= item[1]) {
            inventoryItem.quantity -= item[1];
            transaction.push({ type: "sale", item: inventoryItem, quantitySold: item[2], date: new Date() });
            console.log(`Sold ${item[2]} ${inventoryItem.unit} of ${inventoryItem.name}`);
            break;
        }
    }
    lowStockAlert(item)
}

function restock(item){
    for (let inventoryItem of inventory) {
        if (inventoryItem.name === item[0]) {
            inventoryItem.quantity += item[1];
            transaction.push({ type: "restock", item: inventoryItem, quantityRestocked: item[2], date: new Date() });
            console.log(`Restocked ${item[2]} ${inventoryItem.unit} of ${inventoryItem.name}`);
            break;
        }
    }
}

function search(item){
    console.log(
        inventory.filter(
            inventoryItem => [inventoryItem.name, inventoryItem.category, inventoryItem.price]
            .some(v => v.toString().toLowerCase().includes(item[0].toLowerCase()))
        )
    );
}

function viewInventory(){
    console.log("=== Inventory ===", inventory);
}

function exportAll(){
    console.log("CSV:\n" + 
        ["Name,Category,Quantity,Price,Unit,AddedAt"]
        .concat(i.map(x => Object.values(x).join(','))).join('\n')
    );
}

function viewAllTransactions(){
    console.log("Transactions:\n", transaction);
}

function viewItemAge(){
    console.log(
        inventory.map(inventoryItem =>
             `${inventoryItem.name}: ${Math.floor((new Date() - new Date(inventoryItem.added)) / (1000 * 60 * 60 * 24))}d`)
            .join('\n')
        );
}

function Import(item){
    item[0].forEach(inventoryitem => addItem( [inventoryitem.name, inventoryitem.category,
                                                inventoryitem.quantity, inventoryitem.price, inventoryitem.unit]));
}

function addCustomField(item){
    f[item[0]] = null;
}

function lowStockAlert(item){
    if (inventory[item[0]].quantity <= 10){
        console.log(inventory[item[0]].name + "is below 10 units, Quantity:" + inventory[item[0]].quantity)
    }
}

function updateCustomField(item){
    inventory.find(inventoryItem => inventoryItem.name === item[0])?.custF[item[1]] = item[2];
}



function main(action,Item){
    switch(action){
        case "add": addItem(Item);
        case "edit": editInventory(Item);
        case "removeItem" : removeItem(Item);
        case "sale": sale(Item);
        case "restock": restock(Item);
        
    }


}
