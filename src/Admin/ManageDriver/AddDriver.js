import React from 'react'
import AdminProfileImage from "../../Assets/profile.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function AddDriver() {
    const adminProfile = {
        name: localStorage.getItem("admin"),
        image: AdminProfileImage,
    };

    const navigate = useNavigate();

    const [state, setState] = React.useState({
        name: "",
        phone: "",
        email: "",
        assignedVehicle: "",
    });

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }

    //const [availableDrivers, setAvailableDrivers] = React.useState([]);
    const [availableVehicles, setAvailableVehicles] = React.useState([]);

    // fetch available vehicles from backend
    React.useEffect(() => {
        async function getAvailableVehicles() {
            try {
                const response = await fetch("http://localhost:5000/admin/vehicle/available");
                const data = await response.json();
                console.log(data);
                setAvailableVehicles(data);
            }
            catch (err) {
                console.log(err);
            }
        }
        getAvailableVehicles();
    }, []);



    async function handleSubmit(e) {
        e.preventDefault();
        // Api request to backend
        try{
            const body = {
                name: state.name,
                phone: state.phone,
                email: state.email,
                assignedVehicle: state.assignedVehicle,
            }
            console.log(body);
            const response = await fetch("http://localhost:5000/admin/driver", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            console.log(response);
            const data = await response.json();
            console.log(data);
            if(response.status === 201){
                alert("Driver added successfully");
                navigate("/manage-drivers");     
            }
            else{
                alert("Invalid data")
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
                        <Link to='/manage-drivers'>Manage Drivers</Link>
                    </li>
                </ul>
                <img src={adminProfile.image} alt='profile' style={{marginLeft:"1000px"}}/>
                <span>Hello, {adminProfile.name}</span>
            </div>

            <h1 style={{marginLeft:"400px", marginTop:"80px"}}>Add Driver</h1>

            {/* Buttons for admin */}
            <form onSubmit={handleSubmit}>
                <label style={{width:"250px", marginLeft:"-350px"}}>
                    Name:
                    <input type="text" name="name" onChange={handleChange}/>
                </label>
                <label style={{width:"250px", marginLeft:"-350px"}}>
                    Email:
                    <input type="text" name="email" onChange={handleChange}/>
                </label>
                <label style={{width:"250px", marginLeft:"-350px"}}>
                    Phone Number:
                    <input type="text" name="phone" onChange={handleChange}/>
                </label>
                <label style={{ width: "250px", marginLeft: "-350px" }}>
                    Choose Vehicle:
                </label>
                <select name="assignedVehicle" onChange={handleChange} style={{ width: "150px", marginLeft: "-350px", marginTop:"20px" }} required>
                    <option value="">Select Vehicle</option>
                    {availableVehicles.map((vehicle) => (
                        <option key={vehicle._id} value={vehicle._id}>
                            {vehicle.model}
                        </option>
                    ))}
                </select>
                <button type="submit" style={{marginTop:"100px", marginLeft:"-350px"}}>Add Driver</button>
            </form>
        </>
    )
}

export default AddDriver
