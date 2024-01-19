import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserProfileImage from "../Assets/profile.png";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function PredefinedRoutes() {
    const userProfile = {
        name: localStorage.getItem("user_name"),
        image: UserProfileImage,
    };

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const [predefinedRoute, setPredefinedRoutes] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');

    const handleDateChange = (date) => {
        setSelectedDate(date);
    }

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    }
    // fetch all predefined routes from backend
    // display them in a table
    // add a button to book a predefined route
    useEffect(() => {
        async function fetchPredefinedRoutes() {
            try {
                const response = await fetch('http://localhost:5000/admin/predefinedRoutes');
                const data = await response.json();
                console.log(data);
                setPredefinedRoutes(data)

            }
            catch (err) {
                console.log(err);
            }
        }
        fetchPredefinedRoutes();
    }, []);

    const handleBooking = async (e, routeId) => {
        e.preventDefault();
        const bookingData = {
            userId: localStorage.getItem("user_id"),
            date_time: selectedDate,
            predefinedRoute: routeId,
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
                <span>{userProfile.name}</span>
                {isDropdownOpen && (
                    <div className="dropdownMenu">
                        <ul>
                            <li><Link to="/booking">Bookings</Link></li>
                            <br />
                            <li><Link to="/profile">Profile</Link></li>
                        </ul>
                    </div>
                )}
            </div>

            <div className='routes'>
                <h1 style={{ textAlign: 'center', marginTop: '80px', marginBottom: '100px' }}>Predefined Routes</h1>
                <table className='bookingTable' >
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Pick up Location</th>
                            <th>Drop off Location</th>
                            <th>Fare</th>
                            <th>Book</th>
                        </tr>
                    </thead>
                    <tbody>
                        {predefinedRoute.map((route) => (
                            <tr key={route._id}>
                                
                                <td><label>Date:</label>
                                <DatePicker selected={selectedDate} onChange={handleDateChange}/>
                                </td>
                                <td> <label>Time:</label>
                                    <input type="time" value={selectedTime} onChange={handleTimeChange}/>
                                </td>
                                <td>{route.pickupLocation}</td>
                                <td>{route.destination}</td>
                                <td>{route.fare}</td>
                                <td><button onClick={(e) => handleBooking(e, route._id)}>Book</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default PredefinedRoutes
