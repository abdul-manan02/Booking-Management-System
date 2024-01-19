import mongoose from 'mongoose'

const vehicleSchema = mongoose.Schema({
    model:{
        type: String,
        required: [true, 'Please enter the vehicle model']
    },
    year:{
        type: Number,
        required: [true, 'Please enter the vehicle year']
    },
    regNumber:{
        type: String,
        required: [true, 'Please enter the vehicle registration number'],
        unique: true
    },
    seatingCapacity:{
        type: Number,
        required: [true, 'Please enter the vehicle seating capacity']
    },
    availability:{
        type: Boolean,
        required: [true, 'Please enter the vehicle availability']
    },
    location:{
        type: String,
        required: [true, 'Please enter the vehicle location']
    }
})

const Vehicle = mongoose.model('Vehicle', vehicleSchema, 'Vehicle')
export default Vehicle