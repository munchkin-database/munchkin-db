const config = require('../config.json')
const message = require('../i18n/message.json')
const fs = require('fs');
const { loader_config } = require('../util/alias');
const { getSysDate } = require('../util/util');

const write_loader_log = function (error_code, replace = []){
    let msg_string = message[error_code][config.language]
    let sys_date = getSysDate(true)
    if(msg_string){
        let output_string = msg_string
        replace.forEach(pattern => {
            msg_string = msg_string.replace('%1%', pattern)
        });
        msg_string = sys_date + error_code + ' : ' + msg_string + '\n'
        fs.appendFile( loader_config.loader_log_file_path, msg_string, ()=>{})
    } else {
        fs.appendFile( loader_config.loader_log_file_path, sys_date + 'Unknown error_code or language_code.\n',  ()=>{})
    }
}

exports.write_loader_log = write_loader_log