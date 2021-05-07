import React from 'react'
import './../scss/menu.scss'

export const NavBar = () => {
    return (
        <nav>
            <div className="title">
                <img src="https://img.icons8.com/dusk/64/000000/christmas-star.png" alt={"Eventify"} className="logo"/>
                <a href="#"><h1>Eventify</h1></a>
            </div>
            <div className="menu">
                <a href="#gallery">Gallery</a>
                <a href="#about">Who We Are</a>
                <a href="#events">What We Do</a>
                <a href="#booking">Booking</a>
                <a href="#contacts">Contacts</a>
            </div>
        </nav>
    )
}