import Booking from "../../models/user/bookings.js";
import PredefinedRoute from "../../models/admin/predefinedRoutes.js";
import Driver from "../../models/admin/drivers.js";

const getAllBookings = async(req,res)=>{
    try {
        const bookings = await Booking.find()
        res.status(200).json({bookings})
    } catch (error) {
        res.status(400).json({message: error.message})
    }   
}

const getPendingBookings = async(req,res)=>{
    try {
        const bookings = await Booking.find({status: 'Pending'})
        res.status(200).json({bookings})
    } catch (error) {
        res.status(400).json({message: error.message})
    }   
}

// const createBookings = async(req,res)=>{
//     try {
//         const{pickupLocation, destination, predefinedRoute} = req.body
//         if(predefinedRoute!==undefined){

//             if(pickupLocation!==undefined || destination!==undefined)
//                 return res.status(400).json({message: 'Invalid request'})

//             const predefinedRouteObject = await PredefinedRoute.findById({predefinedRoute})

//             const modifiedBody = {...req.body, fare: predefinedRouteObject.fare}
//             const newBooking = await Booking.create(modifiedBody)
//             res.status(200).json({newBooking})
//         }
//         else{
//             if(pickupLocation!==undefined && destination!==undefined){
//                 const newBooking = await Booking.create(req.body)
//                 res.status(200).json(newBooking)
//             }
//             else
//                 return res.status(400).json({message: 'Invalid request'})            
//         }
//     } catch (error) {
//         res.status(400).json({message: error.message})
//     }   
// }

const createBookings = async(req,res)=>{
    console.log(req.body)
    try {
        const{pickupLocation, destination, predefinedRoute} = req.body
        if(predefinedRoute!==undefined){
            const predefinedRouteObject = await PredefinedRoute.findById(predefinedRoute)
            const modifiedBody = {...req.body, fare: predefinedRouteObject.fare}
            const newBooking = await Booking.create(modifiedBody)
            res.status(200).json({newBooking})
        }
        else{
            if(!pickupLocation)
            {
                if(!destination)
                {
                    return res.status(400).json({message: 'Invalid request'})
                }
            }

            if(pickupLocation)
            {
                if(destination)
                {
                    const newBooking = await Booking.create(req.body)
                    res.status(200).json(newBooking)
                }
                else{
                    return res.status(400).json({message: 'Invalid request'})
                }
            }
            else if(destination)
            {
                if(pickupLocation)
                {
                    const newBooking = await Booking.create(req.body)
                    res.status(200).json(newBooking)
                }
                else{
                    return res.status(400).json({message: 'Invalid request'})
                }
            }
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }   
}

const getBooking = async(req,res)=>{
    try {
        const {bookingId} = req.params
        const booking = await Booking.findById(bookingId)
        if(!booking)
            return res.status(400).json({message: 'booking not found'})
        else
            return res.status(200).json({booking})
    } catch (error) {
        res.status(400).json({message: error.message})
    }   
}

const getPredefinedBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ predefinedRoute: { $ne: null } });
        const predefinedRouteIds = bookings.map(booking => booking.predefinedRoute);
        const predefinedRoutes = await PredefinedRoute.find({ _id: { $in: predefinedRouteIds } });
        console.log(predefinedRoutes)
        res.json(predefinedRoutes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCustomBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ predefinedRoute: { $in: [null, undefined] } });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateBookings = async(req,res)=>{
    try {
        console.log(req.params.bookingId)
        console.log(req.body.status)
        const {status} = req.body
        if(status !== 'Accepted' && status !== 'Rejected')
            return res.status(400).json({message: 'Invalid status'})
        //console.log("Im here")
        
        const {bookingId} = req.params
        const booking = await Booking.findById(bookingId)
        if(!booking)
            return res.status(400).json({message: 'booking not found'})

        if(status==='Rejected')
        {
            //console.log("Im here 1")
            booking.status = status
            const updatedBooking = await booking.save();
            return res.status(200).json({updatedBooking})
        }

        const {driverId} = req.body
        const driver = await Driver.findById(driverId)
        if(!driver)
            return res.status(400).json({message: 'Invalid driverId'})

            
        if(booking.pickupLocation!==undefined && booking.destination!==undefined)
        {
            const {fare} = req.body
            booking.status = status
            booking.fare = fare
            booking.assignedDriver = driver
            const updatedBooking = await booking.save();
            res.status(200).json({updatedBooking})
        }
        else if(booking.predefinedRoute!==undefined){
            booking.status = status
            booking.assignedDriver = driver
            const updatedBooking = await booking.save();
            res.status(200).json({updatedBooking})
        }
        else{
            return res.status(400).json({message: 'Invalid request'})
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }   
}

export{
    getAllBookings,
    getPendingBookings,
    getPredefinedBookings,
    getCustomBookings,
    createBookings,
    getBooking,
    updateBookings
}