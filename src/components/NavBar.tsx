import React, {useState} from 'react'
import Dropdown from "./Dropdown";
import translate from './../json/translate_config.json';
import '../scss/blocks/menu.scss'

const NavBar = ({getLocale}) => {
    const [locale, setLocale] = useState<string>('en-US');

    const getSelectedLocale = (loc) => {
        setLocale(loc);
        getLocale(loc);
    }

    return (
        <nav>
            <div className="title">
                <img src="/images/icon.png" alt={"Eventify"} className="logo"/>
                <a href="#"><h1>Eventify</h1></a>
            </div>
            <div className="menu">
                <a href="#gallery">{translate[locale]["Gallery"]}</a>
                <a href="#about">{translate[locale]["Who We Are"]}</a>
                <a href="#events">{translate[locale]["What We Do"]}</a>
                <a href="#booking">{translate[locale]["Booking"]}</a>
                <a href="#contacts">{translate[locale]["Contacts"]}</a>
                <Dropdown getLocale={getSelectedLocale}/>
            </div>
        </nav>
    )
}

export default NavBar