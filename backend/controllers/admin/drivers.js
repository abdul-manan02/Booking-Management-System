import Driver from '../../models/admin/drivers.js'
import Vehicle from '../../models/admin/vehicles.js'

const createDriver = async (req, res) => {
    const driver = new Driver(req.body);
    const {assignedVehicle} = req.body
    try {
        const existingDriver = await Driver.findOne({email: driver.email});
        if (existingDriver) {
            return res.status(400).json({ msg: 'Email must be unique' });
        }
        if(assignedVehicle!==null){
            const vehicle = await Vehicle.findByIdAndUpdate(assignedVehicle, {availability: false}, {new: true, runValidators: true});
        }
        await driver.save();
        res.status(201).json(driver);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updatedVehicle = async (req, res) => {
    const id = req.params.id
    let {vehicleId } = req.body;
    vehicleId = vehicleId == "No Vehicle" ? null : vehicleId;
    //console.log(vehicleId + ' ' + id);
    try {
        const driver = await Driver.findById(id);
        console.log(driver.assignedVehicle)
        if(driver.assignedVehicle!==null){
            //console.log("I am here 1")
            const vehicle = await Vehicle.findByIdAndUpdate(driver.assignedVehicle, {availability: true}, {new: true, runValidators: true});
        }
        if(vehicleId!==null){
            //console.log("I am here 2 ")
            const vehicle = await Vehicle.findByIdAndUpdate(vehicleId, {availability: false}, {new: true, runValidators: true});
        }
        //console.log("I am here 3")
        driver.assignedVehicle = vehicleId;
        await driver.save();
        res.status(200).json(driver);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const driver = await Driver.findByIdAndDelete(id);
        const vehicle = await Vehicle.findByIdAndUpdate(driver.assignedVehicle, {availability: true}, {new: true, runValidators: true});
        if (!driver) return res.status(404).json({ message: 'Driver not found' });
        res.json({ message: 'Driver deleted successfully' });
    } catch (error){
        res.status(500).json({ message: error.message });
    }
}


const getAllDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.json(drivers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getDriver = async (req, res) => {
    try {
        const driver = await Driver.findById(req.params.id);
        if (!driver) return res.status(404).json({ message: 'Driver not found' });
        res.json(driver);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAvailableDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find({ assignedVehicle: null });
        res.status(200).json(drivers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export{
    createDriver,
    updatedVehicle,
    deleteVehicle,
    getAllDrivers,
    getDriver,
    getAvailableDrivers
}