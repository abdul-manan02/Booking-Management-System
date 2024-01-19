import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../UserStyles/Booking.css";
import reservation from "../Assets/reservation.jpg";
import { Link, useNavigate } from 'react-router-dom';
import UserProfileImage from "../Assets/profile.png";


function Booking() {
    const userProfile = {
        name: localStorage.getItem("user_name"),
        image: UserProfileImage,
    };

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const navigate = useNavigate();
    async function handleChangeToPredefined() {
        navigate("/predefined_routes");
    }

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');
    const [pickupLocation, setPickupLocation] = useState('');
    const [destination, setDestination] = useState('');

    const handlePickupLocationChange = (event) => {
        setPickupLocation(event.target.value);
    }

    const handleDestinationChange = (event) => {
        setDestination(event.target.value);
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    }

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const bookingData = {
            userId: localStorage.getItem("user_id"),
            date_time: selectedDate,
            pickupLocation: pickupLocation,
            destination: destination,
        };
        console.log(bookingData);
        const response = await fetch('http://localhost:5000/user/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });
        console.log(response);
        const data = await response.json();
        console.log(data);
        if(response.status === 200) {
            alert("Booking Successful");
        }
        else {
            alert("Booking Failed");
        }
    }


    return (
        <>
            <div className='userNav'>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                </ul>
                <img src={userProfile.image} alt="User Profile" id='imageSrc' onClick={toggleDropdown} />
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
            <div className='logo'>
                <img src={reservation} alt="" />
            </div>
            <div className="bookingContainer">
                <h2>Book Your Rental</h2>
                <form onSubmit={handleSubmit}>
                    <label>Date:</label>
                    <DatePicker selected={selectedDate} onChange={handleDateChange}/>

                    <label>Time:</label>
                    <input type="time" value={selectedTime} onChange={handleTimeChange}/>

                    <label>Pickup Location:</label>
                    <input
                        type="text"
                    value={pickupLocation}
                    onChange={handlePickupLocationChange}
                    />

                    <label>Drop off Location:</label>
                    <input
                        type="text"
                    value={destination}
                    onChange={handleDestinationChange}
                    />
                    <br />
                    <button type="submit" id='bookingButton'>Book Now</button>
                </form>

                <h3 style={{marginLeft:"70px", marginTop:"60px"}}>Book from our pre defined routes</h3>
                <button id='predefined' style={{marginLeft:"140px", marginTop:"0px"}} onClick={handleChangeToPredefined}>Click Me!</button>
            </div>
        </>
    );
};

export default Booking;
