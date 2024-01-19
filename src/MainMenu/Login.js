import React from 'react';
import "../MainMenuStyles/Login.css";
import image from "../Assets/login.png"
import Navbar from "../Components/Navbar";
import { useNavigate } from 'react-router-dom';

function Login() {
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

    async function handleSubmit(e) {
        e.preventDefault();
        navigate('/signup');
    }

    async function handleAdminLogin(e) {
        e.preventDefault();
        navigate('/admin-login');
    }

    async function handleSubmitForm(e) {
        e.preventDefault();
        // Api request to backend
        try{
            const response = await fetch("http://localhost:5000/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(state),
            });
            console.log(response);
            if(response.status === 200){
                // store the user id in local storage
                const data = await response.json();
                localStorage.setItem("user_id", data._id);
                localStorage.setItem("user_name", data.name);
                // console.log(localStorage.getItem("user_id"));
                // accessing the mongoose id
                navigate("/user-dashboard");
            }
            else{
                alert("Invalid credentials")
            }
        }
        catch(err){
            console.log(err);
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
                        <h1>Log In</h1>
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
                        <button id="forgot">Forgot Password?</button>
                        <button id="signButton">Log In</button>
                    </form>
                </div>
                <div className="container2">
                    <div className="overlay">
                        <div className="overlayPanel left">
                            <button className="ghost" id="signIn" >Sign In</button>
                        </div>
                        <div className="overlayPanel right">
                            <h1>Welcome Back!</h1>
                            <p>Stay updated by logging in with your credentials</p>
                            <button className="ghost2" id="signUp" onClick={handleSubmit}>I'm New User</button>
                            <button onClick={handleAdminLogin} className='ghost2' style={{marginTop:"150px"}}>Admin Login</button>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
        </>
    )
}

export default Login;