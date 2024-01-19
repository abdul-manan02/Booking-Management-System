import React from 'react';
import "../MainMenuStyles/Login.css";
import image from "../Assets/login.png"
import Navbar from "../Components/Navbar";
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const navigate = useNavigate();

    const [state, setState] = React.useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }

    async function handleLogin(e) {
        e.preventDefault();
        navigate('/login');
    }

    async function handleSubmitForm(e) {
        e.preventDefault();
        // Hardcoded admin credentials
        if(state.email === "i200644@nu.edu.pk" && state.password === "admin"){
            localStorage.setItem("admin", "Admin");
            navigate("/admin-dashboard");
        }
    }

    return(
        <>
        <Navbar/>
        <div className="mainPage">
            <img src={image} id='logo1' alt="logo" />
            <div className="container">
                <div className="formContainer adminContainer">
                    <form onSubmit={handleSubmitForm}>
                        <h1>Hello Admin</h1>
                        <br />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={state.email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={state.password}
                            onChange={handleChange}
                        />
                        <button id="signButton" style={{marginTop:"45px"}}>Log In</button>
                    </form>
                </div>
                <div className="container2">
                    <div className="overlay">
                        <div className="overlayPanel left">
                            <button className="ghost" id="signIn" >Sign In</button>
                        </div>
                        <div className="overlayPanel right">
                            <h1>Welcome Back!</h1>
                            <p>Keep up the hardwork</p>
                            <button onClick={handleLogin} className='ghost2' style={{marginTop:"250px"}}>User Login</button>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
        </>
    )
}

export default AdminLogin;