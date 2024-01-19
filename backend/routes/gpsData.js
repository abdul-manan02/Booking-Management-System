import express from 'express';
const router = express.Router();

import {
    getAllGpsData,
    getGpsData,
    getLatestGpsData,
    createGpsData
} from '../controllers/gpsData.js';

router.route('/').get(getAllGpsData).post(createGpsData);
router.route('/:vehicleId').get(getGpsData);
router.route('/:vehicleId/latest').get(getLatestGpsData);

export default router;