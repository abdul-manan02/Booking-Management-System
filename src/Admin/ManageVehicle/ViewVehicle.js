import React, { useEffect } from 'react'
import AdminProfileImage from "../../Assets/profile.png";
import { Link } from 'react-router-dom';

function ViewVehicle() {
    const adminProfile = {
        name: localStorage.getItem("admin"),
        image: AdminProfileImage,
    };

    // View all vehicles
    const [data, setState] = React.useState([]);


    useEffect(() => {
        const getAllVehicles = async () => {
            try {
                const response = await fetch('http://localhost:5000/admin/vehicle');
                if (response.status !== 200) {
                    throw new Error(response.statusText);
                }
                //console.log(response);
                const data = await response.json();
                console.log(data);
                setState(data);
            }
            catch (error) {
                console.log(error);
            }
        };
        getAllVehicles();
    }, []);

    // show all vehicles in a table
    return (
        <>
            <div className='userNav'>
                <ul>
                    <li>
                        <Link to='/admin-dashboard'>Admin Dashboard</Link>
                    </li>
                    <li>
                        <Link to='/manage-vehicles'>Manage Vehicles</Link>
                    </li>
                </ul>
                <img src={adminProfile.image} alt='profile' style={{ marginLeft: "1000px" }} />
                <span>Hello, {adminProfile.name}</span>
            </div>

            <h1 style={{ textAlign: "center", marginTop: "50px" }}>View Vehicles</h1>

            <div style={{ marginLeft: "-140px", marginTop: "80px" }}>
                <form>
                    <table className="bookingTable">
                        <thead>
                            <tr>
                                <th>Registration Number</th>
                                <th>Model</th>
                                <th>Year</th>
                                <th>Seating Capacity</th>
                                <th>Location</th>
                                <th>Availability</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((vehicle) => (
                                <tr>
                                    <td>{vehicle.regNumber}</td>
                                    <td>{vehicle.model}</td>
                                    <td>{vehicle.year}</td>
                                    <td>{vehicle.seatingCapacity}</td>
                                    <td>{vehicle.location}</td>
                                    <td>{vehicle.availability ? "True" : "False"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
            </div>
        </>
    )
}

export default ViewVehicle
