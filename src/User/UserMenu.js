import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../UserStyles/UserMenu.css";
import UserProfileImage from "../Assets/profile.png";
import "react-slideshow-image/dist/styles.css";
import { Fade } from 'react-slideshow-image';
import image1 from "../Assets/slide1.png";
import image2 from "../Assets/slide2.png";
import { useNavigate } from 'react-router-dom';


const slideImages = [
    {
        url: image1
    },
    {
        url: image2
    }
];

const sliderStyle = {
    display: 'flex',
    height: '500px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    // make border 
    border: '5px solid #fff',
    // move inside image upwards
    backgroundPosition: 'center center',
}


function UserMenu() {
    const userProfile = {
        name: localStorage.getItem("user_name"),
        image: UserProfileImage,
    };

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const navigate = useNavigate();

    async function handleButton() {
        navigate("/booking");
    }

    return (
        <>
            <div className='userNav'>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                    <li><Link to="/track-location">Track Location</Link></li>
                </ul>
                <img src={userProfile.image} style={{marginLeft:"650px"}} alt="User Profile" id='imageSrc' onClick={toggleDropdown} />
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

            <div className='slideContainer'>
                <Fade>
                    {slideImages.map((image, index) => (
                        <div key={index} className="each-slide">
                            <div style={{ ...sliderStyle, backgroundImage: `url(${image.url})` }}>
                            </div>
                        </div>
                    ))}
                </Fade>
            </div>

            <div>
                <h1 style={{textAlign:"center", marginTop:"80px"}}>🌟 Book your tickets now 🌟</h1>
                {/* add some styles to button */}
                <button style={{marginTop:"50px", marginLeft:"800px", width:"250px"}} onClick={handleButton}>Book Now</button>
            </div>
        </>
    )
}

export default UserMenu
