import React, {useEffect, useState} from 'react';
import Slider from "react-slick";
import DatePicker from "react-datepicker";

import axios from "axios";

import InfoTooltip from "./InfoTooltip";
import {validateBooking, formatBooking} from './../utils/booking';

import gallery from "./../json/gallery.json";
import translate from './../json/translate_config.json';

import "react-datepicker/dist/react-datepicker.css";
import './../scss/blocks/booking.scss'

export default function BookingForm({loc}) {
    const today = new Date();
    today.setHours(0,0,0);

    const [selectedDate, setSelectedDate] = useState<Date | null>(today);
    const [event, setEvent] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [venue, setVenue] = useState<number>(0);
    const [note, setNote] = useState<string>("");
    const [locale, setLocale] = useState<string>('en-US');

    useEffect(() => {
        setLocale(loc);
    }, [loc])

    const handleDateChange = (date: Date | null) => {
        if (date >= today)
            setSelectedDate(date);
        else
            alert(translate[locale]['date_picker_alert']);
    };

    const submitBooking = (e) => {
        e.preventDefault();
        const booking = formatBooking(event, selectedDate, location, type, gallery.images[venue].image, note, locale);
        if (validateBooking(event, selectedDate, location, type)) {
            axios.post('http://localhost:3001/bookings', { booking })
                .then(res=>{
                    setSelectedDate(today);
                    setEvent("");
                    setLocation("");
                    setType("");
                    setNote("");
                })
        } else {
            alert(translate[locale]['booking_error']);
        }
    }

    return (
        <form className={"booking-form"} onSubmit={submitBooking}>
            <p>{translate[locale]['booking_explain']}</p>
            <div className={"booking-field-container"}>
                <label>{translate[locale]['event_field_label']}</label>
                <input type={"text"} placeholder={translate[locale]['event_field_placeholder']}
                       className={"booking-field booking-input-field"}
                       value={event}
                       onChange={(e) => setEvent(e.target.value)}/>
                <InfoTooltip label={translate[locale]['event_field_info']}/>
            </div>
            <div className={"booking-field-container"}>
                <label>{translate[locale]['date_field_label']}</label>
                <DatePicker selected={selectedDate}
                            className={"booking-date booking-field"}
                            value={selectedDate}
                            onChange={(date) => handleDateChange(date)} />
                <InfoTooltip label={translate[locale]['date_field_info']}/>
            </div>
            <div className={"booking-field-container"}>
                <label>{translate[locale]['location_field_label']}</label>
                <input type={"text"} placeholder={translate[locale]['location_field_placeholder']}
                       className={"booking-field booking-input-field"}
                       value={location}
                       onChange={(e) => setLocation(e.target.value)}/>
                <InfoTooltip label={translate[locale]['location_field_info']}/>
            </div>
            <div className={"booking-field-container"}>
                <label>{translate[locale]['type_field_label']}</label>
                <input type={"text"} placeholder={translate[locale]['type_field_placeholder']}
                       className={"booking-field booking-input-field"}
                       value={type}
                       onChange={(e) => setType(e.target.value)}/>
                <InfoTooltip label={translate[locale]['type_field_info']}/>
            </div>
            <div className={"booking-field-container"}>
                <label>{translate[locale]['venue_field_label']}<InfoTooltip label={translate[locale]['venue_field_info']}/></label>
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
                <p>{translate[locale]['note_field_label']}</p>
                <textarea className={"booking-field"} placeholder={translate[locale]['note_field_placeholder']}
                          value={note}
                          onChange={(e) => setNote(e.target.value)}/>
            </div>
            <input type={"submit"} value={translate[locale]['submit']}/>
        </form>
    );
};

