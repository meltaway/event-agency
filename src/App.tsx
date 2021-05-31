import React, { useState } from "react";
import { useQuery } from "react-query";

import {FacebookShareButton, TelegramShareButton, TwitterShareButton} from "react-share";

import NavBar from './components/NavBar';
import EventCard from './components/EventCard';
import Gallery from './components/Gallery';
import { LoadingMessage, ErrorMessage } from './components/Messages';
import Filters from './components/Filters'
import BookingForm from "./components/BookingForm";
import {filterEvents, sortEventsByDate} from "./utils/events";

import translate from './json/translate_config.json';
import './css/normalize.css';

import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {fab} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

library.add(fas, fab)

function App() {
    const [page, setPage] = useState<number>(0);
    const [filter, setFilter] = useState<String>('dont');
    const [date, setDate] = useState<Date>(new Date());
    const [checkedType, setCheckedType] = useState<boolean>(false);
    const [type, setType] = useState<String>(null);
    const [search, setSearch] = useState<string>(null);
    const [locale, setLocale] = useState<string>('en-US');

    const { isLoading, error, data } = useQuery("all-events",
        () => fetch('http://localhost:3001/events', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors'
        }).then((res) => res.json()) );

    let events: JSX.Element;
    if (isLoading)
        events = <LoadingMessage message={"Loading events..."}/>
    else if (error)
        events = <ErrorMessage message={"loading events"}/>

    const PER_PAGE = 4;
    const offset = page * PER_PAGE;

    const nextPage = () => {
        if (page < Math.ceil(data.length / PER_PAGE) - 1)
            setPage(page + 1)
    }

    const prevPage = () => {
        if (page > 0)
            setPage(page - 1)
    }

    const getRadioFilter = (value) => {
        setFilter(value)
    }

    const getSelectedDate = (value) => {
        setDate(value)
        date.setHours(0, 0, 0)
    }

    const getCheckedFilter = (checked) => {
        setCheckedType(checked)
    }

    const getSelectedType = (selectedOption) => {
        setType(selectedOption)
    }

    const getSelectedLocale = (loc) => {
        setLocale(loc);
    }

    const getSearch = (str) => {
        setSearch(str);
    }

    return (
        <div className="App">
            <header>
                <NavBar getLocale={getSelectedLocale}/>
            </header>
            <main>
                <section id="gallery">
                    <Gallery loc={locale}/>
                </section>
                <section id="about">
                    <h2>{translate[locale]["Who We Are"]}</h2>
                    <h3>{translate[locale]["h3_about"]}</h3>
                    <p>{translate[locale]["at_eventify"]} <span style={{color: '#a82548'}}>Eventify</span>, {translate[locale]["p_about_1"]}</p>
                    <p>{translate[locale]["at_eventify"]} <span style={{color: '#a82548'}}>Eventify</span>, {translate[locale]["p_about_2"]}</p>
                    <p>{translate[locale]["p_about_3"]}</p>
                </section>
                <section id="events">
                    <h2>{translate[locale]["What We Do"]}</h2>
                    <Filters getRadioFilter={getRadioFilter}
                             getSelectedDate={getSelectedDate}
                             getChecked={getCheckedFilter}
                             getSelected={getSelectedType}
                             getSearch={getSearch}
                             loc={locale}
                    />
                    <div className={"events-container"} style={events ? {display: 'flex', justifyContent: 'center'} : {display: 'grid'}}>
                        {
                            events ? events :
                                sortEventsByDate(filterEvents(data, filter, date, checkedType ? type : null, search ? search : null))
                                    .slice(offset, offset + PER_PAGE)
                                    .map((e) =>
                                        <EventCard
                                            id={e.id}
                                            event={e.event}
                                            image={e.image}
                                            type={e.type}
                                            location={e.location}
                                            date={e.date}
                                            description={e.description.split('.')[0].split(',')[0] + '.'}
                                            key={e.id}
                                            loc={locale}
                                        />
                                    )
                        }
                    </div>
                    <div className={"event-btn-container"}>
                        <button onClick={prevPage} disabled={!page}>{translate[locale]["back"]}</button>
                        <button onClick={nextPage}>{translate[locale]["next"]}</button>
                    </div>
                </section>
                <section id="booking">
                    <h2>{translate[locale]["booking_title"]}</h2>
                    <BookingForm loc={locale}/>
                </section>
            </main>
            <footer>
                <div className="contacts-container">
                    <div id="contacts">
                        <div className="contact-logo">
                            <img src="/images/icon.png" alt="Eventify" className="logo"/>
                            <a href="#gallery"><p>Eventify</p></a>
                        </div>
                        <div className="contact-info">
                            <p>{translate[locale]["address"]}</p>
                            <p>8:00-20:00 {translate[locale]["timetable"]}</p>
                            <p>{translate[locale]["phone"]}: +380 44 204 9494</p>
                            <p>{translate[locale]["email"]}: mail@eventify.world</p>
                        </div>
                    </div>
                    <div className="map">
                        <p>{translate[locale]["map_explain"]}</p>
                        <iframe title={"eventify map"}
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1270.2703579710123!2d30.46094!3d50.449655!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce82b9d930e5%3A0x8b1e1e0c5175e2f!2z0JrQn9CGINGW0LwuINC60L7RgNC_0YPRgSDihJYx!5e0!3m2!1sru!2sua!4v1620398191470!5m2!1sru!2sua"
                            width="400" height="300" style={{border: 0,}} allowFullScreen={false} loading="lazy">
                        </iframe>
                    </div>
                    <div className="quick-links">
                        <TwitterShareButton
                            url={"http://eventify.net"}
                            title={translate[locale]["share_quote"]}
                            hashtags={["eventify"]}>
                            <FontAwesomeIcon icon={['fab', 'twitter']} size="3x"/>
                        </TwitterShareButton>
                        <FacebookShareButton
                            url={"http://eventify.net"}
                            quote={translate[locale]["share_quote"]}
                            hashtag={"#eventify"}>
                            <FontAwesomeIcon icon={['fab', 'facebook']} size="3x"/>
                        </FacebookShareButton>
                        <TelegramShareButton
                            url={"http://eventify.net"}
                            title={translate[locale]["share_quote"]}>
                            <FontAwesomeIcon icon={['fab', 'telegram']} size="3x"/>
                        </TelegramShareButton>
                    </div>
                </div>
                <div className="copyright">
                    <p>{translate[locale]["copyright"]}</p>
                    <p>{translate[locale]["website_by"]}</p>
                </div>
            </footer>
        </div>
    );
}

export default App;
