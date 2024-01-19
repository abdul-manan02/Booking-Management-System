import React from 'react'
import AdminProfileImage from "../../Assets/profile.png";
import { Link } from 'react-router-dom';

function DeleteVehicle() {
    const adminProfile = {
        name: localStorage.getItem("admin"),
        image: AdminProfileImage,
    };

    // Delete vehicle by using regNumber
    const [state, setState] = React.useState({
        regNumber: "",
    });

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        // Api request to backend
        try {
            const response = await fetch("http://localhost:5000/admin/vehicle/regNumber/" + state.regNumber, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response);
            const data = await response.json();
            console.log(data);
            // if (response.status === 200) {
            //     alert("Vehicle deleted successfully");
            //     navigate("/manage-vehicles");
            // }
            // else {
            //     alert("Vehicle not found")
            // }
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
                <img src={adminProfile.image} alt='profile' style={{ marginLeft: "1000px" }} />
                <span>Hello, {adminProfile.name}</span>
            </div>

            <h1 style={{ marginLeft: "400px", marginTop: "80px" }}>Delete Vehicle</h1>

            <form onSubmit={handleSubmit} >
                <label style={{width:"250px", marginLeft:"-350px", marginTop:"50px"}}>Registration Number</label>
                <input style={{width:"250px", marginLeft:"-350px", marginTop:"50px"}} type='text' name='regNumber' placeholder='Registration Number' onChange={handleChange} required />
                <button style={{width:"150px", marginLeft:"-350px", marginTop:"50px"}} type='submit'>Delete Vehicle</button>
            </form>
        </>
    )
}

export default DeleteVehicle
