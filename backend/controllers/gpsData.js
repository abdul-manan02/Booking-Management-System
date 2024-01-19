import GpsData from '../models/gpsData.js';

const getAllGpsData = async (req, res) => {
    try {
        const gpsData = await GpsData.find();
        res.status(200).json(gpsData);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getGpsData = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const gpsData = await GpsData.find({ vehicleId });
        res.status(200).json(gpsData);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getLatestGpsData = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const gpsData = await GpsData.find({ vehicleId }).sort({ timestamp: -1 }).limit(1);
        res.status(200).json(gpsData);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createGpsData = async (req, res) => {
    try {
        const newGpsData = await GpsData.create(req.body);
        res.status(201).json(newGpsData);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export { 
    getAllGpsData, 
    getGpsData, 
    getLatestGpsData,
    createGpsData 
};