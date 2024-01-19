import mongoose from "mongoose";

const predefinedRoutesSchema = mongoose.Schema({
    pickupLocation:{
        type: String,
        required: [true, "To is required"]
    },
    destination:{
        type: String,
        required: [true, "From is required"]
    }, 
    fare:{
        type: Number,
        required: [true, "Price is required"]
    }
})

const PredefinedRoute = mongoose.model("Predefined Route", predefinedRoutesSchema, "Predefined Route")
export default PredefinedRoute