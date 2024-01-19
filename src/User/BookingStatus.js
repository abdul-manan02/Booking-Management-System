import React, { useEffect, useState } from 'react';
import UserProfileImage from "../Assets/profile.png";
import { Link } from 'react-router-dom';
import "../UserStyles/Booking.css";

function BookingStatus() {
    const userProfile = {
        name: localStorage.getItem("user_name"),
        image: UserProfileImage,
    };

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const [bookingData, setBookingData] = useState([]);
    const [predefinedRoutes, setPredefinedRoutes] = useState([]);

    useEffect(() => {
        const getBookingData = async () => {
            try {
                const response = await fetch('http://localhost:5000/user/bookings');
                if (response.status !== 200) {
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                setBookingData(data.bookings);
            }
            catch (error) {
                console.log(error);
            }
        };
        getBookingData();
    }, []);


    useEffect(() => {
        const getPredefinedRoutes = async () => {
            try {
                const response = await fetch(`http://localhost:5000/admin/predefinedRoutes/`);
                if (response.status !== 200) {
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                setPredefinedRoutes(prevState => [...prevState, data]);
                console.log(predefinedRoutes);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        getPredefinedRoutes();
        // bookingData.forEach((booking) => {
        //     if (booking.predefinedRoute !== undefined) {
        //         getPredefinedRoutes(booking.predefinedRoute);
        //     }
        // }
        // );
    // eslint-disable-next-line
    }, [bookingData]);




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

            <div className='bookStatus'>
                <h1 style={{ textAlign: 'center', marginTop: '80px', marginBottom: '100px' }}>Booking Details</h1>
                {/* Table for booking status */}
                <table className='bookingTable'>
                    <thead>
                        <tr>
                            <th>Date and Time</th>
                            <th>Pickup Location</th>
                            <th>Drop off Location</th>
                            <th>Predefined Route</th>
                            <th>Status</th>
                            <th>Fare</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookingData.map((booking) => (
                            <tr key={booking._id}>
                                <td>{new Date(booking.date_time).toLocaleString()}</td>
                                <td>{booking.predefinedRoute ? '-' : booking.pickupLocation}</td>
                                <td>{booking.predefinedRoute ? '-' : booking.destination}</td>
                                <td>{booking.predefinedRoute ? booking.predefinedRoute : '-'} </td>
                                <td>{booking.status}</td>
                                <td>{booking.fare}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default BookingStatus
