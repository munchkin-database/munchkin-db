const readline = require('readline');
const fs = require('fs');

const { loader_config, loader_keyname } = require('../util/alias');
const { write_loader_log } = require('../util/logger')

global.munchkin_dataset = {}
let error_flag = false

const load = function (callback) {

    write_loader_log('LDR_I001')

    let line_counter = 0

    const transaction_reader = readline.createInterface({
        input: fs.createReadStream(loader_config.data_file_path),
        output: process.stdout,
        terminal: false
    })

    transaction_reader.on('line', (line) => {

        line_counter++

        let transaction = JSON.parse(line)
        let transaction_type = transaction[loader_keyname.transaction_type]
        let database = transaction[loader_keyname.database]
        let collection = null
        let document = null
        let doucment_id = null

        if(transaction_type == loader_keyname.database_create){
            // create database
            munchkin_dataset[database] = {}
        } else if (transaction_type == loader_keyname.database_drop){
            // drop database
            delete munchkin_dataset[database]
        } else if(transaction_type == loader_keyname.collection_create){
            // create collection
            collection = transaction[loader_keyname.collection]
            munchkin_dataset[database][collection] = {}
        } else if(transaction_type == loader_keyname.collection_drop){
            // drop collection
            collection = transaction[loader_keyname.collection]
            delete munchkin_dataset[database][collection]
        } else if(transaction_type == loader_keyname.document_create || transaction_type == loader_keyname.document_update){
            // document create OR update
            collection = transaction[loader_keyname.collection]
            document = transaction[loader_keyname.document]
            doucment_id = document._id
            munchkin_dataset[database][collection][doucment_id] = document
        } else if(transaction_type == loader_keyname.document_delete){
            // document delete
            collection = transaction[loader_keyname.collection]
            document = transaction[loader_keyname.document]
            doucment_id = document._id
            delete munchkin_dataset[database][collection][doucment_id]
        } else {
            // unknown transaction
            error_flag = true
            write_loader_log('LDR_E002', [line_counter])
            transaction_reader.close()
        }
    });

    transaction_reader.on('close', (line) => {
        if(!error_flag){
            write_loader_log('LDR_I002')
        } else {
            write_loader_log('LDR_E001')
        }

        callback({
            // in case of error, set isLoaded = false
            isLoaded: !error_flag
        })
    })
}

load(function(result){
    console.log(result)
    console.log(munchkin_dataset)
})