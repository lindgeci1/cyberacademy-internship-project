const mongoose = require('mongoose')

exports.testingController = async (req, res) =>{
    try{
        const database = mongoose.connection.db;
        const resources = await database.collection('resources').find().toArray();
        res.json({message:'Database has been connected!', data: resources});
    }
    catch (error){
        console.log(error);
        res.status(500).json({message: `Error with Server`, error: error.message})
    }
}