import React from 'react'
import AdminProfileImage from "../../Assets/profile.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function AddVehicle() {
    const adminProfile = {
        name: localStorage.getItem("admin"),
        image: AdminProfileImage,
    };

    const navigate = useNavigate();

    const [state, setState] = React.useState({
        model: "",
        year: "",
        regNumber: "",
        seatingCapacity: "",
        availability: "",
        location: "",
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
        try{
            const response = await fetch("http://localhost:5000/admin/vehicle", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(state),
            });
            console.log(response);
            const data = await response.json();
            console.log(data);
            if(response.status === 200){
                alert("Vehicle added successfully");
                navigate("/manage-vehicles");
            }
            else{
                alert("Registration number must be unique")
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
                        <Link to='/manage-vehicles'>Manage Vehicles</Link>
                    </li>
                </ul>
                <img src={adminProfile.image} alt='profile' style={{marginLeft:"1000px"}}/>
                <span>Hello, {adminProfile.name}</span>
            </div>

            <h1 style={{marginLeft:"400px", marginTop:"80px"}}>Add Vehicle</h1>

            {/* Buttons for admin */}
            <form onSubmit={handleSubmit}>
                <label style={{width:"250px", marginLeft:"-350px"}}>
                    Model:
                    <input type="text" name="model" onChange={handleChange} />
                </label>
                <label style={{width:"250px", marginLeft:"-350px"}}>
                    Year:
                    <input type="text" name="year" onChange={handleChange} />
                </label>
                <label style={{width:"250px", marginLeft:"-350px"}}>
                    Registration Number:
                    <input type="text" name="regNumber" onChange={handleChange} />
                </label>
                <label style={{width:"250px", marginLeft:"-350px"}}>
                    Seating Capacity:
                    <input type="text" name="seatingCapacity" onChange={handleChange} />
                </label>
                {/* Availability type in backend is boolean */}
                <label style={{width:"250px", marginLeft:"-350px"}}>
                    Availability:
                    <input type="text" name="availability" onChange={handleChange} />
                </label>
                <label style={{width:"250px", marginLeft:"-350px"}}>
                    Location:
                    <input type="text" name="location" onChange={handleChange} />
                </label>
                <button type="submit" style={{marginTop:"30px", marginLeft:"-350px"}}>Add Vehicle</button>
            </form>
        </>
    )
}

export default AddVehicle
