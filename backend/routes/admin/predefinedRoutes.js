import express from "express";
const router = express.Router()

import{
    getAllRoutes,
    getRoute,
    createRoute,
    updateRoute
} from '../../controllers/admin/predefinedRoutes.js'

router.route('/').get(getAllRoutes).post(createRoute)
router.route('/:routeId').patch(updateRoute).get(getRoute)

export default router