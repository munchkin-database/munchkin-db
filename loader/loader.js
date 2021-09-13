const readline = require('readline');
const fs = require('fs');

const { loaderConfig, loaderKeyname } = require('../util/alias');
const { f_writeLoaderLog } = require('../util/logger')

global.munchkinDataset = {}
let error_flag = false

const f_loadDatabase = function (callback = (result) => {}) {

    // start log
    f_writeLoaderLog('LDR_I001')

    let lineCounter = 0

    const transactionReader = readline.createInterface({
        input: fs.createReadStream(loaderConfig.data_file_path),
        output: process.stdout,
        terminal: false
    })

    // read line by line
    transactionReader.on('line', (line) => {

        lineCounter++

        let transaction = JSON.parse(line)
        let transactionType = transaction[loaderKeyname.transaction_type]
        let database = transaction[loaderKeyname.database]
        let collection = null
        let document = null
        let doucment_id = null

        if(transactionType == loaderKeyname.database_create){
            // create database
            munchkinDataset[database] = {}
        } else if (transactionType == loaderKeyname.database_drop){
            // drop database
            delete munchkinDataset[database]
        } else if(transactionType == loaderKeyname.collection_create){
            // create collection
            collection = transaction[loaderKeyname.collection]
            munchkinDataset[database][collection] = {}
        } else if(transactionType == loaderKeyname.collection_drop){
            // drop collection
            collection = transaction[loaderKeyname.collection]
            delete munchkinDataset[database][collection]
        } else if(transactionType == loaderKeyname.document_create || transactionType == loaderKeyname.document_update){
            // document create OR update
            collection = transaction[loaderKeyname.collection]
            document = transaction[loaderKeyname.document]
            doucment_id = document._id
            munchkinDataset[database][collection][doucment_id] = document
        } else if(transactionType == loaderKeyname.document_delete){
            // document delete
            collection = transaction[loaderKeyname.collection]
            document = transaction[loaderKeyname.document]
            doucment_id = document._id
            delete munchkinDataset[database][collection][doucment_id]
        } else {
            // unknown transaction
            error_flag = true
            f_writeLoaderLog('LDR_E002', [lineCounter])
            transactionReader.close()
        }
    });

    transactionReader.on('close', (line) => {
        if(!error_flag){
            f_writeLoaderLog('LDR_I002')
        } else {
            f_writeLoaderLog('LDR_E001')
        }

        callback({
            // in case of error, set isLoaded = false
            isLoaded: !error_flag
        })
    })
}

const f_unloadDatabase = function(){
    munchkinDataset = {}
}

exports.f_loadDatabase = f_loadDatabase
exports.f_unloadDatabase = f_unloadDatabase