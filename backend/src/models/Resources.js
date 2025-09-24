const mongoose = require('mongoose');


const ResourcesModel = new mongoose.Schema({


    title: {
        type:String,
        required: true
    },
    description:{

        type: String,
        required: true
    },

        category:{

        type: String,
        required: true
    },

        link:{

        type: String,
        required: true
    },
}
,
{   
    versionKey: false,
    timestamps: false
}
)

module.exports = mongoose.model('Resources', ResourcesModel);