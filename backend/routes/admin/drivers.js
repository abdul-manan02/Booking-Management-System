import express from 'express';
const router = express.Router()

import{
    createDriver,
    updatedVehicle,
    deleteVehicle,
    getAllDrivers,
    getDriver,
    getAvailableDrivers
} from '../../controllers/admin/drivers.js'

router.route('/').get(getAllDrivers).post(createDriver)
router.route('/id/:id').patch(updatedVehicle).get(getDriver).delete(deleteVehicle)
router.route('/available').get(getAvailableDrivers)

export default router