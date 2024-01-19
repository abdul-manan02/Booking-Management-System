import Vehicle from '../../models/admin/vehicles.js'

const getAllVehicles = async(req,res) =>{
    try {
        const allVehicles = await Vehicle.find()
        //console.log(allVehicles)
        if(allVehicles.length===0) 
            res.status(400).json({msg: 'No vehicles found'})
        else
            res.status(200).send(allVehicles)
    } catch (error) {
        res.status(400).json({msg: error})
        console.log(error)
    }
}


const createVehicle = async(req,res) =>{
    try {
        const { model, year, regNumber, seatingCapacity, availability, location } = req.body
        const existingVehicle = await Vehicle.findOne({regNumber});
        //console.log(existingVehicle)
        if (existingVehicle) {
            return res.status(400).json({ msg: 'Registration number must be unique' });
        }
        const newReqest = await Vehicle.create(req.body)
        res.status(200).json(newReqest)
    } catch (error) {
        res.status(400).json({msg: error})
    }
}

const getAvailableVehicles = async(req,res) =>{
    try {
        const allVehicles = await Vehicle.find({availability: true})
        //console.log(allVehicles)
        if(allVehicles.length===0) 
            res.status(400).json({msg: 'No vehicles found'})
        else
            res.status(200).send(allVehicles)
    } catch (error) {
        res.status(400).json({msg: error})
        console.log(error)
    }
}

const updateVehicle = async(req,res) => {
    try {
        //console.log("Im here")
        const {id} = req.params
        //console.log(req.params)
        const { availability, location } = req.body
        //console.log(req.body)
        let updatedVehicle = null
        if(availability!==undefined){
            updatedVehicle = await Vehicle.findByIdAndUpdate(id, {availability}, {new: true, runValidators: true});    
        }
        if(location!==undefined){
            updatedVehicle = await Vehicle.findByIdAndUpdate(id, {location}, {new: true, runValidators: true});
        }

        if(updatedVehicle!==null)
            res.status(200).json(updatedVehicle)
        else
            res.status(400).json({msg: "Request body does not have location or availability"})
    } catch (error) {
        res.status(404).json({msg: error})
    }
}

const updateByRegNumber = async(req,res) => {
    try {
        //console.log("Im here")
        const {regNumber} = req.params
        //console.log(req.params)
        const { availability, location } = req.body
        //console.log(req.body)
        let updatedVehicle = null
        if(availability!==undefined){
            //console.log("Im here")
            updatedVehicle = await Vehicle.findOneAndUpdate({regNumber}, {availability}, {new: true, runValidators: true});    
        }
        if(location!==undefined){
            //console.log("Im here 2")
            updatedVehicle = await Vehicle.findOneAndUpdate({regNumber}, {location}, {new: true, runValidators: true});
        }

        if(updatedVehicle!==null)
            res.status(200).json(updatedVehicle)
        else
            res.status(400).json({msg: "Request body does not have location or availability"})
    } catch (error) {
        res.status(404).json({msg: error})
    }
}

const getVehicle = async(req,res) =>{
    try {
        const {id} = req.params
        const vehicle = await Vehicle.findById(id)
        if(vehicle===null)
            res.status(400).json({msg: 'No vehicle found'})
        else
            res.status(200).send(vehicle)
    } catch (error) {
        res.status(400).json({msg: error})
    }
}

const deleteVehicleByRegNumber = async(req,res) =>{
    try {
        const {regNumber} = req.params
        const vehicle = await Vehicle.findOneAndDelete({regNumber})
        //console.log(regNumber)
        if(vehicle===null)
            res.status(400).json({msg: 'No vehicle found'})
        else
            res.status(200).send(vehicle)
    } catch (error) {
        res.status(400).json({msg: error})
    }
}

const getLocationByVehicleId = async(req,res) =>{
    try {
        const {id} = req.params
        console.log(req.params)
        const vehicle = await Vehicle.findById(id)
        console.log(vehicle)
        if(vehicle===null)
            res.status(400).json({msg: 'No vehicle found'})
        else
            //console.log(vehicle.location)
            res.status(200).json({location: vehicle.location});
    } catch (error) {
        res.status(400).json({msg: error})
    }
}

export{
    getAllVehicles,
    getVehicle,
    updateByRegNumber,
    getAvailableVehicles,
    deleteVehicleByRegNumber,
    createVehicle,
    updateVehicle,
    getLocationByVehicleId
}