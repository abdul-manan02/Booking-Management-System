import React from 'react'
import AdminProfileImage from "../../Assets/profile.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ManageBooking() {
    const adminProfile = {
        name: localStorage.getItem("admin"),
        image: AdminProfileImage,
    };

    const navigate = useNavigate();

    async function handlebutton4() {
        navigate("/view-booking");
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
            <button style={{ marginTop: "150px", marginLeft: "800px", position: "relative", height: "100px", backgroundColor: "black", width: "220px" }} onClick={handlebutton4}>View Booking</button>
        </>
    )
}

export default ManageBooking
