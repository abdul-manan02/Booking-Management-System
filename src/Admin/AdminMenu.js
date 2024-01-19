import { React } from 'react'
import AdminProfileImage from "../Assets/profile.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function AdminMenu() {
    const adminProfile = {
        name: localStorage.getItem("admin"),
        image: AdminProfileImage,
    };

    const navigate = useNavigate();

    async function handlebutton1() {
        navigate("/manage-vehicles");
    }

    async function handlebutton2() {
        navigate("/manage-drivers");
    }

    async function handlebutton3() {
        navigate("/manage-bookings");
    }

    async function handlebutton4() {
        navigate("/manage-routes");
    }

    return (
        <>
            <div className='userNav'>
                <ul>
                    <li><Link to="/">Home</Link></li>
                </ul>
                <img src={adminProfile.image} alt="User Profile" id='imageSrc' style={{ marginLeft: "1330px" }} />
                <span>Hello, {adminProfile.name}</span>
            </div>

            <div>
                <h1 style={{ marginLeft: "400px", marginTop: "80px" }}>Admin Dashboard</h1>
            </div>
            {/* Buttons for admin */}
            <button style={{ marginTop: "100px", marginLeft: "500px", position: "relative", height: "100px", backgroundColor: "black" }} onClick={handlebutton1}>Manage Vehicles</button>
            <button style={{ marginTop: "100px", marginLeft: "500px", position: "relative", height: "100px", backgroundColor: "black" }} onClick={handlebutton2}>Manage Drivers</button>
            <button style={{ marginTop: "150px", marginLeft: "500px", position: "relative", height: "100px", backgroundColor: "black" }} onClick={handlebutton3}>Manage Bookings</button>
            <button style={{ marginTop: "150px", marginLeft: "500px", position: "relative", height: "100px", backgroundColor: "black" }} onClick={handlebutton4}>Manage Routes</button>
        </>
    )
}

export default AdminMenu
