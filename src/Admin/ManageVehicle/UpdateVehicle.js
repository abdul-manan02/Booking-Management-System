import React from 'react'
import { useState } from 'react';
import AdminProfileImage from "../../Assets/profile.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function UpdateVehicle() {
    const adminProfile = {
        name: localStorage.getItem("admin"),
        image: AdminProfileImage,
    };

    const navigate = useNavigate();

    // Update vehicle by using regNumber
    const [state, setState] = React.useState({
        regNumber: "",
        model: "",
        year: "",
        seatingCapacity: "",
        location: "",
        availability: false,
    });

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }

    const [availability, setAvailability] = useState(true);

    const handleChangeAvailability = () => {
        setAvailability(!availability); // Toggle the availability value
    };

    async function handleSubmit(e) {
        e.preventDefault();
        // Api request to backend
        try {
            const response = await fetch("http://localhost:5000/admin/vehicle/regNumber/" + state.regNumber, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    availability: availability,
                    location: state.location,
                }),
            });
            console.log(response);
            const data = await response.json();
            console.log(data);
            if (response.status === 200) {
                alert("Vehicle updated successfully");
                navigate("/manage-vehicles");
            }
            else {
                alert("Vehicle not found")
            }
        }
        catch (err) {
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
                        <Link to='/manage-vehicles'>Manage Vehicles</Link>
                    </li>
                </ul>
                <img src={adminProfile.image} alt='profile' style={{ marginLeft: "980px" }} />
                <span>Hello, {adminProfile.name}</span>
            </div>

            <h1 style={{ marginLeft: "400px", marginTop: "80px" }}>Update Vehicle</h1>

            <form onSubmit={handleSubmit}>
                <label style={{ width: "250px", marginLeft: "-400px", marginTop: "20px" }}>Registration Number</label>
                <input style={{ width: "250px", marginLeft: "-350px", marginTop: "20px" }} type="text" name="regNumber" placeholder="Registration Number" onChange={handleChange} required />
                <label style={{ width: "250px", marginLeft: "-470px", marginTop: "30px" }}>Availability</label>
                <input type="checkbox" checked={availability} style={{marginLeft:"-250px", marginTop:"-25px", blockSize:"30px"}} onChange={handleChangeAvailability} />
                <label style={{ width: "250px", marginLeft: "-480px", marginTop: "30px" }}>Location</label>
                <input style={{ width: "250px", marginLeft: "-350px", marginTop: "20px" }} type="text" name="location" placeholder="Location" onChange={handleChange} required />
                <button style={{ width: "150px", marginLeft: "-350px", marginTop: "40px" }} type="submit">Update Vehicle</button>
            </form>

        </>
    )
}

export default UpdateVehicle
