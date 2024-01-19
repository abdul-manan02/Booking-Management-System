import React from 'react';
import Navbar from '../Components/Navbar';

function ContactUs() {
    return (
        <>
            {/* Include the Navbar component */}
            <Navbar />

            {/* Contact Us content */}
            <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif', color: '#333' }}>
                <h1 style={{ color: '#007BFF' }}>Contact Us</h1>
                <p>Feel free to reach out to us for any inquiries or assistance.</p>

                {/* Contact form (replace with your actual form implementation) */}
                <form style={{ maxWidth: '400px', margin: '0 auto', marginBottom: '20px', textAlign: 'left' }}>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                        Name:
                        <input type="text" name="name" style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                    </label>
                    <br />
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                        Email:
                        <input type="email" name="email" style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                    </label>
                    <br />
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                        Message:
                    </label>
                    <textarea name="message" style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginTop: '10px' }}></textarea>
                    <br />
                    <button type="submit" style={{ backgroundColor: '#007BFF', color: '#fff', padding: '10px', border: 'none', cursor: 'pointer' }}>Submit</button>
                </form>

                {/* Additional contact information */}
                <div>
                    <h2 style={{ color: '#007BFF' }}>Email Us</h2>
                    <p>i200875@nu.edu.pk</p>
                    <p>i200644@nu.edu.pk</p>
                    <p>i200872@nu.edu.pk</p>

                    <h2 style={{ color: '#007BFF' }}>Call Us</h2>
                    <p>03323140555</p>
                    <p>03346541234</p>
                </div>
            </div>
        </>
    );
}

export default ContactUs;
