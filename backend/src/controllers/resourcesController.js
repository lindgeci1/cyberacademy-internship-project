const Resources = require("../models/Resources");


exports.getResources = async (req, res)=>{

    try{
        const resources = await Resources.find();
        res.json({data:resources})
    }
    catch(error){
        res.status(500).json({message: "Error fetching all resources", error: error.message});
    }
}

exports.getResourceByID = async (req, res)=>{

    try{
        const id = req.params.id;
        const resource = await Resources.findById(id);
        if(!resource){
            return res.status(404).json({message: `Resource with this ID ${id} does not exist!`});
        }
        res.json({data:resource})
    }
    catch(error){
        res.status(500).json({message: "Error fetching resource", error: error.message});
    }
}

exports.createResource = async (req, res)=>{

    try{
        const resource = new   Resources(req.body);
        await resource.save();
        res.status(201).json({message: "Resources added!", data:resource})
    }
    catch(error){
        res.status(500).json({message: "Error adding resource", error: error.message});
    }
}

exports.updateResource = async (req, res)=>{

    try{
        const resource = await Resources.findByIdAndUpdate(req.params.id, req.body, {new:true});
         if(!resource){
            return res.status(404).json({message: "Resource not found!"})
        }
        res.json({message: "Resources updated!", data:resource})
    }
    catch(error){
        res.status(500).json({message: "Error updating resource", error: error.message});
    }
}

exports.deleteResources = async (req, res)=>{

    try{
        const id = req.params.id;
        const resource = await Resources.findByIdAndDelete(id);
        if(!resource){
           return res.status(404).json({message: `Resource with this ID ${id} does not exist!`});
        }
        res.json({message: "Resources deleted!", data:resource})
    }
    catch(error){
        res.status(500).json({message: "Error fetching all resources", error: error.message});
    }
}