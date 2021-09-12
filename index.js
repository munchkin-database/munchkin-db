const readline = require('readline');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// In-memory dataset
let dataset = {}
let latestUUID = ''
let targetUUID = ''
let count = 0

const rl = readline.createInterface({
    input: fs.createReadStream('data/transactions'),
    output: process.stdout,
    terminal: false
});

//  read line by line
rl.on('line', (line) => {

    let transaction = JSON.parse(line)

    switch(transaction.ty){
        case 'dbc': // database create
            dataset[transaction.db] = {}
        break
        case 'dbd': // database drop
            delete dataset[transaction.db]
            break
        case 'coc': // collection create
            dataset[transaction.db][transaction.co] = {}
            break
        case 'cod': // collection drop
            delete dataset[transaction.db][transaction.co]
            break
        case 'dc': // document create
            // code here
            count++
            latestUUID = uuidv4()
            if(count == 700000) targetUUID = latestUUID    
            dataset[transaction.db][transaction.co][latestUUID] = transaction.do
        case 'template': // template
            // code here
            break
        default:
        // do nothing
    }
});

// on loading end
rl.on('close', () => {
    let query = {}
    let start = new Date().getTime()
    for(i=0;i<840000;i++){
        query = dataset['store']['books'][targetUUID]
    }
    let end = new Date().getTime()
    console.log('Time', end - start, 'MS')
})
