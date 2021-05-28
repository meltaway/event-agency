import React, {isValidElement, useState} from 'react';
import Slider from "react-slick";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import gallery from "./../json/gallery.json";

import './../scss/blocks/booking.scss'

import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

library.add(fas, far)

const options = [
    { value: 'wedding', label: 'Wedding Ceremony' },
    { value: 'prom', label: 'High School Prom' },
    { value: 'corporate_party', label: 'Corporate Party' },
    { value: 'presentation', label: 'Product Presentation' },
    { value: 'convention', label: 'Convention' },
];

function validateBooking(event: String, date: Date, location: String, type: String, venue: Number, note: String) {
    if (!!event && !!date && !!location && !!type && !!venue)
        return {event, date, location, type, venue, note}
    else return null
}

const InfoTooltip = ({label}) => {
    const [show, setShow] = useState<Boolean>(false);

    const showTooltip = () => {
        setShow(!show);
    };

    return (
        <span className={"info-tooltip"}>
            <FontAwesomeIcon icon={['far', 'question-circle']} className={"info-icon"}
                             onMouseEnter={showTooltip}
                             onMouseLeave={showTooltip}
            />
            <span style={{display: show ? 'flex' : 'none'}} className={"info-text"}>{label}</span>
        </span>
    )
}

export default function BookingForm() {
    const today = new Date();
    today.setHours(0,0,0);

    const [selectedDate, setSelectedDate] = useState<Date | null>(today);
    const [event, setEvent] = useState<string | null>(null);
    const [location, setLocation] = useState<string | null>(null);
    const [type, setType] = useState<string | null>(null);
    const [venue, setVenue] = useState<Number | null>(0);
    const [note, setNote] = useState<string | null>(null);

    const handleDateChange = (date: Date | null) => {
        if (date >= today)
            setSelectedDate(date);
        else
            alert("Note: you cannot set your event date earlier than today!");
    };

    return (
        <form className={"booking-form"}>
            <p>Please fill in all the fields not marked optional.</p>
            <div className={"booking-field-container"}>
                <label>Event name</label>
                <input type={"text"} placeholder={"Event..."}
                       className={"booking-field booking-input-field"}
                       onChange={(e) => setEvent(e.target.value)}/>
                <InfoTooltip label={"The title of your event."}/>
            </div>
            <div className={"booking-field-container"}>
                <label>Date</label>
                <DatePicker selected={selectedDate}
                            className={"booking-date booking-field"}
                            onChange={(date) => handleDateChange(date)} />
                <InfoTooltip label={"The day of the event. Has to be today or later!"}/>
            </div>
            <div className={"booking-field-container"}>
                <label>Location</label>
                <input type={"text"} placeholder={"Address..."}
                       className={"booking-field booking-input-field"}
                       onChange={(e) => setLocation(e.target.value)}/>
                <InfoTooltip label={"The address of the event."}/>
            </div>
            <div className={"booking-field-container"}>
                <label>Type</label>
                <input type={"text"} placeholder={"Type..."}
                       className={"booking-field booking-input-field"}
                       onChange={(e) => setType(e.target.value)}/>
                <InfoTooltip label={"We recommend putting \"wedding\", \"prom\", \"corporate party\", \"presentation\" or \"convention\"."}/>
            </div>
            <div className={"booking-field-container"}>
                <label>Venue <InfoTooltip label={"What you would like the venue to look like."}/></label>
                <Slider dots={true}
                        infinite={true}
                        speed={500}
                        slidesToShow={1}
                        slidesToScroll={1}
                        beforeChange={(current, next) => setVenue(next)}
                        afterChange={(current) => setVenue(current)}
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
                <textarea className={"booking-field"} placeholder={"Note..."}
                          onChange={(e) => setNote(e.target.value)}/>
            </div>
            <input type={"submit"} value={"Submit"}/>
        </form>
    );
};

