const { f_loadDatabase, f_unloadDatabase } = require('./loader/loader')

f_loadDatabase(
    (result) => {
        if(result.isLoaded) {
            console.log(munchkinDataset)
            f_unloadDatabase()
            console.log(munchkinDataset)
        }
    } 
)