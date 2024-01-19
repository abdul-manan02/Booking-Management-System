import React from 'react'
import AdminProfileImage from "../../Assets/profile.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function ManageVehicle() {
    const adminProfile = {
        name: localStorage.getItem("admin"),
        image: AdminProfileImage,
    };

    const navigate = useNavigate();

    async function handleAddVehicle(e) {
        //add vehicle
        e.preventDefault();
        navigate("/add-vehicle");
    }

    async function handleUpdateVehicle(e) {
        //update vehicle
        e.preventDefault();
        navigate("/update-vehicle");
    }

    async function handleDeleteVehicle(e) {
        //delete vehicle
        e.preventDefault();
        navigate("/delete-vehicle");
    }

    async function handleViewVehicle(e) {
        //view vehicle
        e.preventDefault();
        navigate("/view-vehicle");
    }

    return (
        <>
            <div className='userNav'>
                <ul>
                    <li>
                        <Link to='/admin-dashboard'>Admin Dashboard</Link>
                    </li>
                </ul>
                <img src={adminProfile.image} alt='profile' style={{marginLeft:"1230px"}}/>
                <span>Hello, {adminProfile.name}</span>
            </div>

            <div>
                <h1 style={{ marginLeft: "400px", marginTop: "80px" }}>Manage Vehicles</h1>
            </div>

            {/* Buttons for admin */}
            <button style={{ marginTop: "120px", marginLeft: "500px", position: "relative", height: "100px", backgroundColor: "black", width:"220px" }} onClick={handleAddVehicle}>Add Vehicle</button>
            <button style={{ marginTop: "120px", marginLeft: "500px", position: "relative", height: "100px", backgroundColor: "black", width:"220px"  }} onClick={handleUpdateVehicle}>Update Vehicle</button>
            <button style={{ marginTop: "150px", marginLeft: "500px", position: "relative", height: "100px", backgroundColor: "black", width:"220px"  }} onClick={handleDeleteVehicle}>Delete Vehicle</button>
            <button style={{ marginTop: "150px", marginLeft: "500px", position: "relative", height: "100px", backgroundColor: "black", width:"220px" }} onClick={handleViewVehicle}>View Vehicles</button>
        </>
    )
}

export default ManageVehicle
