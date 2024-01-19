import React from 'react'
import AdminProfileImage from "../../Assets/profile.png";
import { Link } from 'react-router-dom';

function DeleteDriver() {
    const adminProfile = {
        name: localStorage.getItem("admin"),
        image: AdminProfileImage,
    };

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

    const [availableDrivers, setAvailableDrivers] = React.useState([]);

    // fetch all drivers
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(selectedDriver);
        try {
            const response = await fetch(`http://localhost:5000/admin/driver/id/${selectedDriver}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            console.log(data);
            if(response.status === 200)
                alert("Driver deleted successfully");
            else{
                alert("Driver deletion failed");
            }
            //navigate("/manage-drivers");
        } catch (err) {
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

        <h1 style={{marginLeft:"400px", marginTop:"80px"}}>Delete Driver</h1>
        
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
            <button style={{ width: "150px", marginLeft: "-350px", marginTop:"150px" }} type="submit">Delete</button>
        </form>
        </>
    )
}

export default DeleteDriver
