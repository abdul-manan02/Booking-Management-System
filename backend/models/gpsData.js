import mongoose from 'mongoose';

const gpsDataSchema = mongoose.Schema({
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const GpsData = mongoose.model('GpsData', gpsDataSchema, 'GpsData');
export default GpsData;