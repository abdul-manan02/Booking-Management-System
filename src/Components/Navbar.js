import React from 'react'
import "../ComponentStyles/Navbar.css"
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div className='navbar'>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li id='login'><Link to="/login">Log In</Link></li>
                <li id='signup'><Link to="/signup">Sign Up</Link></li>
            </ul>
        </div>
    )
}

export default Navbar
