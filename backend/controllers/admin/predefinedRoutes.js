import PredefinedRoute from '../../models/admin/predefinedRoutes.js'

const getAllRoutes = async(req, res) =>{
    try {
        const allRoutes = await PredefinedRoute.find()
        if(allRoutes.length===0) 
            res.status(400).json({msg: 'No vehicles found'})
        else
            res.status(200).send(allRoutes)
    } catch (error) {
        res.status(400).json({msg: error})
        console.log(error)
    }
}

const getRoute = async(req, res) =>{
    try {
        const route = await PredefinedRoute.findById(req.params.routeId)
        if(!route)
            res.status(400).json({msg: 'No vehicle found'})
        else
            res.status(200).send(route)
    } catch (error) {
        res.status(400).json({msg: error})
        console.log(error)
    }
}


const createRoute = async(req, res) =>{
    try {
        const{pickupLocation, destination} = req.body
        if(pickupLocation==destination)
            return res.status(400).json({msg: 'PickupLocation and Destination cannot be same'})    
        const newRoute = await PredefinedRoute.create(req.body)
        res.status(200).json(newRoute)
    } catch (error) {
        res.status(400).json({msg: error})
    }
}

const updateRoute = async (req, res) => {
    try {
        const { id } = req.params;
        const { pickupLocation, destination, fare } = req.body;

        const route = await PredefinedRoute.findById(id);

        if (!route) {
            return res.status(404).json({ msg: 'Route not found' });
        }

        if (fare !== undefined) {
            route.fare = fare;
        }

        if (pickupLocation !== undefined) {
            if (pickupLocation === (destination || route.destination)) {
                return res.status(400).json({ msg: 'pickupLocation and destination cannot be the same' });
            }
            route.pickupLocation = pickupLocation;
        }

        if (destination !== undefined) {
            if (destination === (pickupLocation || route.pickupLocation)) {
                return res.status(400).json({ msg: 'pickupLocation and destination cannot be the same' });
            }
            route.destination = destination;
        }

        const updatedRoute = await route.save();

        res.status(200).json(updatedRoute);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export{
    getAllRoutes,
    getRoute,
    createRoute,
    updateRoute
}