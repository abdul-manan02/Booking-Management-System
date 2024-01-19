import React from 'react'
import AdminProfileImage from "../../Assets/profile.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function UpdateDriver() {
    const adminProfile = {
        name: localStorage.getItem("admin"),
        image: AdminProfileImage,
    };

    const navigate = useNavigate();

    const [state, setState] = React.useState({
        assignedVehicle: "",
    });

    const [selectedDriver, setSelectedDriver] = React.useState(null);

    const handleChange = (e) => {
        setSelectedDriver(e.target.value);
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }
    console.log(selectedDriver);
    const [availableDrivers, setAvailableDrivers] = React.useState([]);
    const [availableVehicles, setAvailableVehicles] = React.useState([]);

    //fetch all drivers from backend
    React.useEffect(() => {
        async function getAllDrivers() {
            try {
                const response = await fetch("http://localhost:5000/admin/driver");
                const data = await response.json();
                //console.log(data);
                setAvailableDrivers(data);
            }
            catch (err) {
                console.log(err);
            }
        }
        getAllDrivers();
    }, []);
    

    // fetch available vehicles from backend
    React.useEffect(() => {
        async function getAvailableVehicles() {
            try {
                const response = await fetch("http://localhost:5000/admin/vehicle/available");
                const data = await response.json();
                //console.log(data);
                setAvailableVehicles(data);
            }
            catch (err) {
                console.log(err);
            }
        }
        getAvailableVehicles();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        // Api request to backend
        try{
            const body = {
                vehicleId: state.assignedVehicle,
            }
            console.log(body);
            // bring the driver id from the dropdown menu
            const driverId = state.assignedDriver;
            //console.log(driverId);

            const response = await fetch("http://localhost:5000/admin/driver/id/"+driverId, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const data = await response.json();
            console.log(data);
            if (response.status === 200) {
                alert("Driver updated successfully");
                navigate("/manage-drivers");
            }
            else {
                alert("Invalid data")
            }
        }
        catch(err){
            console.log(err);
        }
    }



    return (
        <>
            <div className='userNav'>
                <ul>
                    <li>
                        <Link to='/admin-dashboard'>Admin Dashboard</Link>
                    </li>
                    <li>
                        <Link to='/manage-drivers'>Manage Drivers</Link>
                    </li>
                </ul>
                <img src={adminProfile.image} alt='profile' style={{marginLeft:"1000px"}}/>
                <span>Hello, {adminProfile.name}</span>
            </div>

            <h1 style={{marginLeft:"400px", marginTop:"80px"}}>Update Driver</h1>

            <form onSubmit={handleSubmit}>
                <label style={{ width: "150px", marginLeft: "-350px", marginTop:"30px" }}>Driver</label>
                <select name="assignedDriver" onChange={handleChange} style={{ width: "150px", marginLeft: "-350px", marginTop:"30px" }} required>
                    <option value="">Select Driver</option>
                    {availableDrivers.map((driver) => (
                        <option key={driver._id} value={driver._id}>
                            {driver.name}
                        </option>
                    ))}
                </select>
                {/* Add null option to the list of drivers */}
                <label style={{ width: "150px", marginLeft: "-350px", marginTop:"30px" }}>Vehicle</label>
                <select name="assignedVehicle" onChange={handleChange} style={{ width: "150px", marginLeft: "-350px", marginTop:"30px" }} required>
                    <option value="">Select Vehicle</option>
                    {availableVehicles.map((vehicle) => (
                        <option key={vehicle._id} value={vehicle._id}>
                            {vehicle.model}

                        </option>
                    ))}
                    <option value={null}>No Vehicle</option>
                </select>
                <button style={{ width: "150px", marginLeft: "-350px", marginTop:"150px" }} type="submit">Update</button>
            </form>

        </> 
    )
}

export default UpdateDriver
