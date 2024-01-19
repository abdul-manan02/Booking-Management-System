import mongoose from "mongoose"

const driverSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter the driver name']
    },
    phone:{
        type: String,
        required: [true, 'Please enter the driver phone']
    },
    email:{
        type: String,
        required: [true, 'Please enter the driver email']
    },
    assignedVehicle:{
        type: mongoose.Schema.Types.ObjectId,
        default: null
    }
})

const Driver = mongoose.model('Driver', driverSchema, 'Driver')
export default Driver