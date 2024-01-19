import React from 'react';
import AdminProfileImage from '../../Assets/profile.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function SelectPredefined() {
    const adminProfile = {
        name: localStorage.getItem('admin'),
        image: AdminProfileImage,
    };

    // fetch available drivers
    const [data, setState] = React.useState([]);
    const [driverId, setDriverId] = React.useState('');
    const navigate = useNavigate();

    React.useEffect(() => {
        const getAllDrivers = async () => {
            try {
                const response = await fetch('http://localhost:5000/admin/driver');
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

    // submit button which will assign the driver to the booking
    const handleSubmit = async (event) => {
        event.preventDefault();
        const bookingId = localStorage.getItem('bookingId');
        //console.log(driverId);
        //console.log(bookingId);
        try {
            const response = await fetch(`http://localhost:5000/user/bookings/id/${bookingId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    driverId,
                    status: 'Accepted',
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

    return (
        <>
            <div className="userNav">
                <ul>
                    <li>
                        <Link to="/admin-dashboard">Admin Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/manage-bookings">Manage Booking</Link>
                    </li>
                </ul>
                <img src={adminProfile.image} alt="profile" style={{ marginLeft: '1000px' }} />
                <span>Hello, {adminProfile.name}</span>
            </div>

            <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Select Driver</h1>

            <form>
                <label style={{ width: '150px', marginLeft: '-50px', marginTop: '30px' }}>Choose Driver</label>
                <select style={{ width: '150px', marginLeft: '-50px', marginTop: '30px' }} onChange={(e) => setDriverId(e.target.value)} required>
                    <option value="">Select</option>
                    {data.map((driver) => (
                        <option key={driver._id} value={driver._id}>
                            {driver.name}
                        </option>
                    ))}
                </select>

                <button style={{ width: '130px', marginLeft: '-50px', height: '40px', marginTop: '30px' }} onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </>
    );
}

export default SelectPredefined;




// try {
        //     const response = await fetch(`http://localhost:5000/admin/booking/${bookingId}`, {
        //         method: 'PATCH',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             driver: driverId,
        //             status: 'Confirmed',
        //         }),
        //     });
        //     if (response.status !== 200) {
        //         throw new Error(response.statusText);
        //     }
        //     const result = await response.json();
        //     console.log(result);
        //     navigate('/view-booking');
        // } catch (error) {
        //     console.log(error);
        // }