const path = require('path')

const config = require('../config.json')
const {f_accessJson} = require('./util')

const f_resolveConfigPath = function(p){
    return path.resolve(__dirname, '../', f_accessJson(p, config))
}

exports.loaderConfig = {
    data_folder_path : f_resolveConfigPath('data.folder_path'),
    data_file_path : f_resolveConfigPath('data.file_path'),
    loader_log_folder_path : f_resolveConfigPath('log.loader.folder_path'),
    loader_log_file_path : f_resolveConfigPath('log.loader.file_path')
}

exports.loaderKeyname = {
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
