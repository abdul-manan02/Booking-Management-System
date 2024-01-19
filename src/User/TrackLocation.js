import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';
//import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "../UserStyles/UserMenu.css";
import UserProfileImage from "../Assets/profile.png";

function TrackLocation() {
    const userProfile = {
        name: localStorage.getItem("user_name"),
        image: UserProfileImage,
    };

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [data, setState] = React.useState([]);
    const [vehicleId, setVehicleId] = React.useState('');
    const [location, setLocation] = React.useState({ lat: 0, lng: 0 });

    React.useEffect(() => {
        const getAllDrivers = async () => {
            try {
                const response = await fetch('http://localhost:5000/admin/vehicle');
                if (response.status !== 200) {
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                console.log(data);
                setState(data);
            } catch (error) {
                console.log(error);
            }
        };
        getAllDrivers();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log(vehicleId);
            // Fetch the location data based on the selected vehicle ID
            const response = await fetch(`http://localhost:5000/admin/vehicle/location/id/${vehicleId}`);
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }
            //console.log(response);
            const result = await response.json();
            console.log(result);

            // Update the location state with the fetched data
            setLocation({
                lat: parseFloat(result.latitude),
                lng: parseFloat(result.longitude)
            });
            console.log(location);
        } catch (error) {
            console.log(error);
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            <div className='userNav'>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                    <li><Link to="/track-location">Track Location</Link></li>
                </ul>
                <img src={userProfile.image} style={{ marginLeft: "650px" }} alt="User Profile" id='imageSrc' onClick={toggleDropdown} />
                <span>Hello, {userProfile.name}</span>
                {isDropdownOpen && (
                    <div className="dropdownMenu">
                        <ul>
                            <li><Link to="/booking_status">Bookings</Link></li>
                            <br />
                            <li><Link to="/profile">Profile</Link></li>
                        </ul>
                    </div>
                )}
            </div>
            <form>
                <label style={{ width: '150px', marginLeft: '-50px', marginTop: '30px' }}>Choose Vehicle</label>
                <select style={{ width: '150px', marginLeft: '-50px', marginTop: '30px' }} onChange={(e) => setVehicleId(e.target.value)} required>
                    <option value="">Select</option>
                    {data.map((vehicle) => (
                        <option key={vehicle._id} value={vehicle._id}>
                            {vehicle.regNumber}
                        </option>
                    ))}
                </select>

                <button style={{ width: '130px', marginLeft: '-50px', height: '40px', marginTop: '30px' }} onClick={handleSubmit}>
                    Submit
                </button>

                {/* Display the map with the fetched location
                {location.lat !== 0 && location.lng !== 0 && (
                    <WrappedMap
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&v=3.exp&libraries=geometry,drawing,places`}
                        loadingElement={<div style={{ height: '100%' }} />}
                        containerElement={<div style={{ height: '400px', width: '100%' }} />}
                        mapElement={<div style={{ height: '100%' }} />}
                    />
                )} */}

                {/* {location.latitude !== 0 && location.longitude !== 0 && (
                    <MapContainer
                        center={[location.latitude, location.longitude]}
                        zoom={10}
                        style={{ height: '400px', width: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[location.latitude, location.longitude]}>
                            <Popup>Your Marker Popup Content</Popup>
                        </Marker>
                    </MapContainer>
                )} */}
            </form>
        </>
    );
}

export default TrackLocation;
