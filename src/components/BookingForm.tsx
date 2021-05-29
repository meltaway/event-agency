import React, {isValidElement, useEffect, useState} from 'react';
import Slider from "react-slick";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import gallery from "./../json/gallery.json";
import translate from './../json/translate_config.json';

import './../scss/blocks/booking.scss'

import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

library.add(fas, far)

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

export default function BookingForm({loc}) {
    const today = new Date();
    today.setHours(0,0,0);

    const [selectedDate, setSelectedDate] = useState<Date | null>(today);
    const [event, setEvent] = useState<string | null>(null);
    const [location, setLocation] = useState<string | null>(null);
    const [type, setType] = useState<string | null>(null);
    const [venue, setVenue] = useState<Number | null>(0);
    const [note, setNote] = useState<string | null>(null);
    const [locale, setLocale] = useState<string>('en-US');

    const handleDateChange = (date: Date | null) => {
        if (date >= today)
            setSelectedDate(date);
        else
            alert(translate[locale]['date_picker_alert']);
    };

    useEffect(() => {
        setLocale(loc);
    }, [loc])

    const options = [
        { value: 'wedding', label: translate[locale]['Wedding Ceremony'] },
        { value: 'prom', label: translate[locale]['High School Prom'] },
        { value: 'corporate_party', label: translate[locale]['Corporate Party'] },
        { value: 'presentation', label: translate[locale]['Product Presentation'] },
        { value: 'convention', label: translate[locale]['Convention'] },
    ];

    return (
        <form className={"booking-form"}>
            <p>{translate[locale]['booking_explain']}</p>
            <div className={"booking-field-container"}>
                <label>{translate[locale]['event_field_label']}</label>
                <input type={"text"} placeholder={translate[locale]['event_field_placeholder']}
                       className={"booking-field booking-input-field"}
                       onChange={(e) => setEvent(e.target.value)}/>
                <InfoTooltip label={translate[locale]['event_field_info']}/>
            </div>
            <div className={"booking-field-container"}>
                <label>{translate[locale]['date_field_label']}</label>
                <DatePicker selected={selectedDate}
                            className={"booking-date booking-field"}
                            onChange={(date) => handleDateChange(date)} />
                <InfoTooltip label={translate[locale]['date_field_info']}/>
            </div>
            <div className={"booking-field-container"}>
                <label>{translate[locale]['location_field_label']}</label>
                <input type={"text"} placeholder={translate[locale]['location_field_placeholder']}
                       className={"booking-field booking-input-field"}
                       onChange={(e) => setLocation(e.target.value)}/>
                <InfoTooltip label={translate[locale]['location_field_info']}/>
            </div>
            <div className={"booking-field-container"}>
                <label>{translate[locale]['type_field_label']}</label>
                <input type={"text"} placeholder={translate[locale]['type_field_placeholder']}
                       className={"booking-field booking-input-field"}
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
                          onChange={(e) => setNote(e.target.value)}/>
            </div>
            <input type={"submit"} value={translate[locale]['submit']}/>
        </form>
    );
};

