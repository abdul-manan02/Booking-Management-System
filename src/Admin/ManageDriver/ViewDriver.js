import React from 'react'
import AdminProfileImage from "../../Assets/profile.png";
import { Link } from 'react-router-dom';

function ViewDriver() {
    const adminProfile = {
        name: localStorage.getItem("admin"),
        image: AdminProfileImage,
    };

    // View all drivers
    const [data, setState] = React.useState([]);
    const [drivers, setDrivers] = React.useState([]);
    const [vehicles, setVehicles] = React.useState([]);

    //const navigate = useNavigate();

    React.useEffect(() => {
        const getAllDrivers = async () => {
            try {
                const response = await fetch('http://localhost:5000/admin/driver');
                if (response.status !== 200) {
                    throw new Error(response.statusText);
                }
                //console.log(response);
                const data = await response.json();
                //console.log(data);
                setState(data);
            }
            catch (error) {
                console.log(error);
            }
        };
        getAllDrivers();
    }, []);

    console.log(setDrivers);

    React.useEffect(() => {
        const getVehicleName = async () => {
            try {
                const response = await fetch('http://localhost:5000/admin/vehicle');
                if (response.status !== 200) {
                    throw new Error(response.statusText);
                }
                //console.log(response);
                const data = await response.json();
                console.log(data);
                setVehicles(data);
            }
            catch (error) {
                console.log(error);
            }
        }
        getVehicleName();
    }, [drivers]);

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
                <img src={adminProfile.image} alt='profile' style={{ marginLeft: "1000px" }} />
                <span>Hello, {adminProfile.name}</span>
            </div>

            <h1 style={{ textAlign: "center", marginTop: "50px" }}>View Drivers</h1>

            <div style={{ marginLeft: "-140px", marginTop: "80px" }}>
                <form>
                    <table className="bookingTable">
                        <thead>
                            <tr>
                                <th>Driver Name</th>
                                <th>Driver Email</th>
                                <th>Assigned Vehicle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((driver) => (
                                <tr key={driver._id}>
                                    <td>{driver.name}</td>
                                    <td>{driver.email}</td>
                                    {/* display the vehicle name obtained above through api */}
                                    <td>
                                        {driver.assignedVehicle ? (
                                            vehicles.map((vehicle) =>
                                                vehicle._id === driver.assignedVehicle ? (
                                                    <span key={vehicle._id}>{vehicle.regNumber}</span>
                                                ) : null
                                            )
                                        ) : (
                                            <span>No Vehicle</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
            </div>
        </>
    )
}

export default ViewDriver
