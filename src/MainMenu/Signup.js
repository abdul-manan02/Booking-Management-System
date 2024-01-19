import React from 'react';
import image from "../Assets/signup.png"
import "../MainMenuStyles/Signup.css"
import Navbar from "../Components/Navbar";
import { useNavigate } from 'react-router-dom';


function Signup() {
    const [state, setState] = React.useState({
        name: "",
        phoneNumber: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        // Api request to backend
        try{
            const response = await fetch("http://localhost:5000/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(state),
            });
            const responseData = await response.json();
            console.log(responseData);
            if(response.data.success){
                // redirect to login page
                navigate("/login");
            }
            else{
                alert("Please fill all the fields")
            }
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <>
        <Navbar/>
        <div className="mainPage">
            <img src={image} id='logo2' alt="logo" />
            <div className="container">
                <div className="formContainer adminContainer">
                    <form onSubmit={handleSubmit}>
                        <h1>Sign Up</h1>
                        <br />
                        <input
                            type="text"
                            name="name"
                            value={state.name}
                            onChange={handleChange}
                            placeholder="Name"
                        />
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={state.phoneNumber}
                            onChange={handleChange}
                            placeholder="Phone"
                        />
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
                        <input
                            type="password"
                            name="password"
                            placeholder="Confirm Password"
                            value={state.password}
                            onChange={handleChange}
                        />
                        <button id="signUpButton">Sign Up</button>
                    </form>
                </div>
                <div className="container2">
                    <div className="overlay">
                        <div className="overlayPanel left">
                            <button className="ghost" id="signIn" >Sign In</button>
                        </div>
                        <div className="overlayPanel right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and Start your journey with us</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Signup;