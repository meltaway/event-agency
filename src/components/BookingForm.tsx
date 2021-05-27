import React, {useState} from 'react';
import Slider from "react-slick";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TypeSelect from "./TypeSelect";
import gallery from "./../json/gallery.json";

import './../scss/blocks/booking.scss'

import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

library.add(fas, far)

export default function BookingForm() {
    const [type, setType] = useState<String>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };
    const handleSelectionChange = (selectedOption) => {
        setType(selectedOption)
    }

    return (
        <form className={"booking-form"}>
            <p>Please fill in all the fields not marked optional.</p>
            <div className={"booking-field-container"}>
                <label>Event name</label>
                <input type={"text"} />
            </div>
            <div className={"booking-field-container"}>
                <label>Date</label>
                <DatePicker selected={selectedDate}
                            className={"booking-date"}
                            onChange={(date) => handleDateChange(date)} />
            </div>
            <div className={"booking-field-container"}>
                <label>Location</label>
                <input type={"text"} />
            </div>
            <div className={"booking-field-container"}>
                <label>Type</label>
                <TypeSelect getType={handleSelectionChange} filterCheck={false}/>
            </div>
            <div className={"booking-field-container"}>
                <label>Venue</label>
                <Slider dots={true}
                        infinite={true}
                        speed={500}
                        slidesToShow={1}
                        slidesToScroll={1}
                >
                    {
                        gallery.images.map((item, index) => {
                            return <img src={item.image} alt={item.title} className={"venue-image"} key={index}/>
                        })
                    }
                </Slider>
            </div>
            <div className={"booking-field-container"}>
                <p>Anything else we should know? Leave us a note! (optional)</p>
                <textarea />
            </div>
        </form>
    );
};

