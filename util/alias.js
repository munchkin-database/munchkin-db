const path = require('path')

const config = require('../config.json')
const {accessJson} = require('./util')

const resolveConfigPath = function(p){
    return path.resolve(__dirname, '../', accessJson(p,config))
}

exports.loader_config = {
    data_folder_path : resolveConfigPath('data.folder_path'),
    data_file_path : resolveConfigPath('data.file_path'),
    loader_log_folder_path : resolveConfigPath('log.loader.folder_path'),
    loader_log_file_path : resolveConfigPath('log.loader.file_path')
}

exports.loader_keyname = {
    transaction_type : 'ty',
    database_create : 'dbc',
    database_drop : 'dbd',
    collection_create : 'coc',
    collection_drop : 'cod',
    document_create : 'doc',
    document_update : 'dou',
    document_delete : 'dod',
    database : 'db',
    collection : 'co',
    document : 'do'
}
