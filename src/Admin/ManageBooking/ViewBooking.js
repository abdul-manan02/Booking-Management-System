import React, { useState, useEffect } from 'react';
import AdminProfileImage from "../../Assets/profile.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ViewBooking() {
    const adminProfile = {
        name: localStorage.getItem("admin"),
        image: AdminProfileImage,
    };

    // view booking details
    const [data, setData] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [predefinedRoutes, setPredefinedRoutes] = useState({});
    const [selectedStatus, setSelectedStatus] = useState('Pending');

    const navigate = useNavigate();

    useEffect(() => {
        const getAllBookings = async () => {
            try {
                const response = await fetch('http://localhost:5000/user/bookings');
                if (response.status !== 200) {
                    throw new Error(response.statusText);
                }
                const result = await response.json();
                const bookings = result.bookings || [];
                setData(bookings);
                const initialStatus = {};
                bookings.forEach(booking => {
                    initialStatus[booking._id] = 'Pending';
                });
                setPredefinedRoutes(initialStatus);
            } catch (error) {
                console.log(error);
            }
        };
        getAllBookings();
    }, []);

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleStatusChange = (event, bookingId) => {
        const newStatus = event.target.value;
        // Update the status for the specific booking ID
        setPredefinedRoutes(prevStatus => ({
            ...prevStatus,
            [bookingId]: newStatus,
        }));
        setSelectedStatus(newStatus);
    }

    const handleConfirmButtonClick = (bookingId) => {
        // check whether the api call is to predefined route or custom route
        const isPredefinedRoute = data.find(booking => booking._id === bookingId).predefinedRoute;
        if (isPredefinedRoute) {
            console.log(selectedStatus);
            if (selectedStatus === 'Rejected') {
                // update the status of the booking
                const updateStatus = async () => {
                    try {
                        const response = await fetch(`http://localhost:5000/user/bookings/id/${bookingId}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                status: 'Rejected',
                            }),
                        });
                        if (response.status !== 200) {
                            throw new Error(response.statusText);
                        }
                        const result = await response.json();
                        console.log(result);
                        navigate('/view-booking');
                    } catch (error) {
                        console.log(error);
                    }
                };
                updateStatus();
            }
            else if (selectedStatus === 'Accepted') {
                //open a pop up where admin can select the driver
                const selectDriver = async () => {
                    try {
                        const response = await fetch('http://localhost:5000/admin/driver/available');
                        if (response.status !== 200) {
                            throw new Error(response.statusText);
                        }
                        console.log("Im here");
                        const result = await response.json();
                        console.log(result);
                        localStorage.setItem('bookingId', bookingId);
                        //console.log(localStorage.getItem('bookingId'));
                        
                    } catch (error) {
                        console.log(error);
                    }
                }
                selectDriver();
                navigate('/select-predefined-driver');
            }
        }
        else {
            if (selectedStatus === 'Rejected') {
                // update the status of the booking
                const updateStatus = async () => {
                    try {
                        const response = await fetch(`http://localhost:5000/user/bookings/id/${bookingId}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                status: 'Rejected',
                            }),
                        });
                        if (response.status !== 200) {
                            throw new Error(response.statusText);
                        }
                        const result = await response.json();
                        console.log(result);
                        navigate('/view-booking');
                    } catch (error) {
                        console.log(error);
                    }
                };
                updateStatus();
            }
            else if (selectedStatus === 'Accepted') {
                //open a pop up where admin can select the driver
                const selectDriver = async () => {
                    try {
                        const response = await fetch('http://localhost:5000/admin/driver/available');
                        if (response.status !== 200) {
                            throw new Error(response.statusText);
                        }
                        //console.log("Im here");
                        const result = await response.json();
                        console.log(result);
                        localStorage.setItem('bookingId', bookingId);
                        //console.log(localStorage.getItem('bookingId'));
                        
                    } catch (error) {
                        console.log(error);
                    }
                }
                selectDriver();
                navigate('/select-custom-driver');
            }
        }
    };

    const filteredBookings = selectedType === 'Predefined' 
    ? data.filter(booking => booking.predefinedRoute && booking.status === 'Pending')
    : selectedType === 'Custom' 
        ? data.filter(booking => !booking.predefinedRoute && booking.status === 'Pending') 
        : data.filter(booking => booking.status === 'Pending');
    //update above so only pending ones are displayed


    return (
        <>
            <div className='userNav'>
                <ul>
                    <li>
                        <Link to='/admin-dashboard'>Admin Dashboard</Link>
                    </li>
                    <li>
                        <Link to='/manage-bookings'>Manage Booking</Link>
                    </li>
                </ul>
                <img src={adminProfile.image} alt='profile' style={{ marginLeft: "1000px" }} />
                <span>Hello, {adminProfile.name}</span>
            </div>

            <h1 style={{ textAlign: "center", marginTop: "50px" }}>View Booking Details</h1>

            <form>
                <label style={{ width: "150px", marginLeft: "-50px", marginTop: "30px" }}>Choose Booking type</label>
                <select
                    style={{ width: "150px", marginLeft: "-50px", marginTop: "30px" }}
                    value={selectedType}
                    onChange={handleTypeChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="Predefined">Predefined Routes</option>
                    <option value="Custom">Custom Routes</option>
                </select>
            </form>

            <table style={{ marginLeft: "180px", marginTop: "50px" }} className='bookingTable'>
                <thead>
                    <tr>
                        <th>Source</th>
                        <th>Destination</th>
                        <th>Booking Date</th>
                        <th>Booking Time</th>
                        <th>Booking Status</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredBookings.map((booking) => (
                        <tr key={booking._id}>
                            <td>{booking.pickupLocation || 'N/A'}</td>
                            <td>{booking.destination || 'N/A'}</td>
                            <td>{new Date(booking.date_time).toLocaleDateString() || 'N/A'}</td>
                            <td>{new Date(booking.date_time).toLocaleTimeString() || 'N/A'}</td>
                            <td>
                                <select value={predefinedRoutes[booking._id]} onChange={(e) => handleStatusChange(e, booking._id)}>
                                    <option value="Pending">Pending</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Accepted">Accepted</option>
                                </select>
                                <button style={{ width: "130px", marginLeft: "20px", height: "30px", paddingTop: "10px", position: "relative" }} onClick={() => handleConfirmButtonClick(booking._id)}>Confirm</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default ViewBooking;
