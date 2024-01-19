import React from 'react'
import "../MainMenuStyles/Home.css"
import Navbar from "../Components/Navbar";
import image from "../Assets/pexels-arthouse-studio-4338020.jpg"

function Home(){
    return (
        <>
        <div className='homeNav'>
            <Navbar/>
        </div>
        <div className='imageContainer'>
        <img src={image} alt='Img'/>
        </div>
        <div className='homeIntro'>
        <h1>🌟 Welcome to  Uzair Transport And Tourism Where Every Experience Awaits! 🌟</h1>
        </div>
        </>
    )
}
export default Home 
