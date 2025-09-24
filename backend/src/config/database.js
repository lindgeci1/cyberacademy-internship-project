const mongoose = require('mongoose')


const database_connection = async() =>{

    try{
        await mongoose.connect(process.env.MONGO_DB_CONNECTION);
        console.log("Connection Succeded!");
    }
    catch (error){
        console.log("Connection Failed, the error is: ", error.message)
        process.exit(1);
    }
}
module.exports = database_connection;