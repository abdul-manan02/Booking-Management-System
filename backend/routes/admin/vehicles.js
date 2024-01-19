import express from 'express'
const router = express.Router()

import {
    getAllVehicles,
    getVehicle,
    createVehicle, 
    updateVehicle,
    updateByRegNumber,
    deleteVehicleByRegNumber,
    getAvailableVehicles,
    getLocationByVehicleId
} from '../../controllers/admin/vehicles.js'

router.route('/').post(createVehicle).get(getAllVehicles)
router.route('/id/:id').patch(updateVehicle).get(getVehicle)
router.route('/available').get(getAvailableVehicles)
router.route('/regNumber/:regNumber').patch(updateByRegNumber).delete(deleteVehicleByRegNumber)
router.route('/location/id/:id').get(getLocationByVehicleId)

export default router