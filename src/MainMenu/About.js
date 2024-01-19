// Import necessary dependencies
import React from 'react';
import Navbar from "../Components/Navbar";

// Define the About component
function About() {
    return (
        <>
            {/* Include the Navbar component */}
            <Navbar />

            {/* About Us content */}
            <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif', color: '#333', background: '#f8f8f8', borderRadius: '10px', maxWidth: '1000px', marginTop: '200px', marginLeft: '400px' }}>
                {/* Add an image at the top (uncomment and replace with your actual image import) */}
                {/* <img src={aboutImage} alt="About Us" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '10px' }} /> */}
                
                <h1 style={{ color: '#007BFF' }}>About Us</h1>
                <p>Welcome to our website! We are a passionate team dedicated to...</p>

                <h2 style={{ color: '#007BFF' }}>Our Mission</h2>
                <p>Our mission is to revolutionize the way people experience transportation by providing a seamless and efficient bookings management system for vehicles. We are dedicated to simplifying the process of vehicle reservations, ensuring reliability, accessibility, and convenience for our users.</p>

                <h2 style={{ color: '#007BFF' }}>Meet the Team</h2>
                <ul style={{ listStyle: 'none', padding: '10px' }}>
                    <li style={{ color: '#007BFF' }}>Umer Farooq - CEO</li>
                    <li style={{ color: '#007BFF' }}>Abdul Manan - CTO</li>
                    <li style={{ color: '#007BFF' }}>Shaheer Imran - Member</li>
                    {/* Add more team members */}
                </ul>
            </div>
        </>
    );
}

// Export the About component
export default About;
