import React from 'react'
import AdminProfileImage from "../../Assets/profile.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function ManageDriver() {
    const adminProfile = {
        name: localStorage.getItem("admin"),
        image: AdminProfileImage,
    };

    const navigate = useNavigate();

    async function handlebutton1() {
        navigate("/add-driver");
    }

    async function handlebutton2() {
        navigate("/update-driver");
    }

    async function handlebutton3() {
        navigate("/delete-driver");
    }

    async function handlebutton4() {
        navigate("/view-driver");
    }

    return (
        <>
            <div className='userNav'>
                <ul>
                    <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
                </ul>
                <img src={adminProfile.image} alt="User Profile" id='imageSrc' style={{ marginLeft: "1330px" }} />
                <span>Hello, {adminProfile.name}</span>
            </div>

            <div>
                <h1 style={{ marginLeft: "400px", marginTop: "80px" }}>Admin Dashboard</h1>
            </div>
            {/* Buttons for admin */}
            <button style={{ marginTop: "100px", marginLeft: "500px", position: "relative", height: "100px", backgroundColor: "black" , width:"220px"}} onClick={handlebutton1}>Add Driver</button>
            <button style={{ marginTop: "100px", marginLeft: "500px", position: "relative", height: "100px", backgroundColor: "black" , width:"220px"}} onClick={handlebutton2}>Update Driver</button>
            <button style={{ marginTop: "150px", marginLeft: "500px", position: "relative", height: "100px", backgroundColor: "black" , width:"220px"}} onClick={handlebutton3}>Delete Driver</button>
            <button style={{ marginTop: "150px", marginLeft: "500px", position: "relative", height: "100px", backgroundColor: "black" , width:"220px"}} onClick={handlebutton4}>View Drivers</button>
        </>
    )
}

export default ManageDriver
