const config = require('../config.json')
const message = require('../i18n/message.json')
const fs = require('fs');
const { loaderConfig } = require('../util/alias');
const { f_getSysDate } = require('../util/util');

const f_writeLoaderLog = function (error_code, replace = []){
    let msg_string = message[error_code][config.language]
    let sys_date = f_getSysDate(true)
    if(msg_string){
        let output_string = msg_string
        replace.forEach(pattern => {
            msg_string = msg_string.replace('%1%', pattern)
        });
        msg_string = sys_date + error_code + ' : ' + msg_string + '\n'
        fs.appendFile( loaderConfig.loader_log_file_path, msg_string, ()=>{})
    } else {
        fs.appendFile( loaderConfig.loader_log_file_path, sys_date + 'Unknown error_code or language_code.\n',  ()=>{})
    }
}

exports.f_writeLoaderLog = f_writeLoaderLog