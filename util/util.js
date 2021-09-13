const f_accessJson = function(path, json){
    return path.split('.').reduce((a,b)=>a[b], json)
}

const f_getSysDate = function(isUTC){
    let date_now = new Date()
    let date_formatted = ''
    if(isUTC){
        date_formatted += '[UTC '
        date_formatted += date_now.getUTCFullYear() + '/'
        date_formatted += (date_now.getUTCMonth() + 1).toString().padStart(2, '0') + '/'
        date_formatted += date_now.getUTCDate().toString().padStart(2, '0') + ' '
        date_formatted += date_now.getUTCHours().toString().padStart(2, '0') + ':'
        date_formatted += date_now.getUTCMinutes().toString().padStart(2, '0') + ':'
        date_formatted += date_now.getUTCSeconds().toString().padStart(2, '0')
        date_formatted += '] '
    } else {
        date_formatted += '[ '
        date_formatted = date_now.getFullYear() + '/'
        date_formatted += (date_now.getUTCMonth() + 1).toString().padStart(2, '0') + '/'
        date_formatted += date_now.getDate().toString().padStart(2, '0') + ' '
        date_formatted += date_now.getHours().toString().padStart(2, '0') + ':'
        date_formatted += date_now.getMinutes().toString().padStart(2, '0') + ':'
        date_formatted += date_now.getSeconds().toString().padStart(2, '0')
        date_formatted += '] '
    }
    return date_formatted
}

exports.f_accessJson = f_accessJson
exports.f_getSysDate = f_getSysDate