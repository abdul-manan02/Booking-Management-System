import express from 'express'
const router = express.Router()

import{
    getAllBookings,
    getPendingBookings,
    getPredefinedBookings,
    getCustomBookings,
    createBookings,
    getBooking,
    updateBookings
} from '../../controllers/user/bookings.js'

router.route('/').get(getAllBookings).post(createBookings)
router.route('/preDefined').get(getPredefinedBookings)
router.route('/custom').get(getCustomBookings)
router.route('/pending').get(getPendingBookings)
router.route('/id/:bookingId').get(getBooking).patch(updateBookings)

export default router