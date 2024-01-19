import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import cors from 'cors'
import vehicle from './routes/admin/vehicles.js'
import driver from './routes/admin/drivers.js'
import predefinedRoutes from './routes/admin/predefinedRoutes.js'
import booking from './routes/user/bookings.js'
import gps from './routes/gpsData.js'
import user from './routes/user/user.js'

const app = express()
app.use(express.json());
app.use(cors())

app.use('/admin/vehicle', vehicle)
app.use('/admin/driver', driver)
app.use('/admin/predefinedRoutes', predefinedRoutes)
app.use('/user/bookings', booking)
app.use('/gps', gps)
app.use('/user', user)
const port = 5000

const start = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is running on port ${port}`))        
    } catch (error) {
        console.log(error)   
    }
}

start()