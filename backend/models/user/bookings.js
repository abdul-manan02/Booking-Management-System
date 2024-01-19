import mongoose from 'mongoose'

const BookingSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User Id is required']
    },
    date_time:{
        type: Date,
        required: [true, 'Date_Time is required']
    },
    pickupLocation: {
        type: String,
    },
    destination: {
        type: String,
    },
    predefinedRoute: {
        type: mongoose.Schema.Types.ObjectId
    },
    status:{
        type: String,
        enum: {
            values: ['Pending', 'Accepted', 'Rejected'],
            message: 'Status should be either: Pending, Accepted, Rejected'
        },
        default: 'Pending'
    },
    fare:{
        type: Number,
    },
    assignedDriver:{
        type: mongoose.Schema.Types.ObjectId,
    }
})

const Booking = mongoose.model('Booking', BookingSchema, 'Booking')
export default Booking