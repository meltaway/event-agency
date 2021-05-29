import React, {useEffect, useState} from 'react';
import {useQuery} from "react-query";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { IconButton, Collapse, CardActions, CardContent, CardHeader, Card } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import ReactModal from 'react-modal';
import { LoadingMessage, ErrorMessage } from './Messages';

import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import '../scss/blocks/events.scss';
import '../scss/blocks/modal.scss';
import translate from './../json/translate_config.json';

library.add(fas, far)

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
    }),
);

function makeID() {
    let result = ''
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let i = 0; i < 2; i++)
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    result += Math.random().toString().substr(2, 11)
    return result
}

function formatReview(text, event_id) {
    return {
        'id': makeID(),
        'text': text,
        'event_id': event_id
    }
}

export default function EventCard({id, event, image, type, location, date, description, key, loc}) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState<boolean>(false);
    const [open, openModal] = useState<Boolean>(false);
    const [scroll, setScroll] = useState(true);
    const [locale, setLocale] = useState<string>('en-US');

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleModal = () => {
        openModal(!open)
    };

    useEffect(() => {
        setLocale(loc);
    }, [loc]);

    const { isLoading, error, data } = useQuery("all-reviews",
        () => fetch('http://localhost:3001/reviews', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors'
        }).then((res) => res.json()) )

    let reviews: JSX.Element;
    if (isLoading)
        reviews = <LoadingMessage message={"Loading events..."}/>
    else if (error)
        reviews = <ErrorMessage message={"loading events"}/>

    const handleSubmit = () => {
        const text = (document.getElementById("review-text-" + id) as HTMLInputElement).value.trim()
        if (text.length !== 0) {
            fetch('http://localhost:3001/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formatReview(text,  id), null, 4)
            }).then(response => response.json())
        }
    }

    return (
        <Card className={"card"} data-id={ id} key={ id}>
            <div>
                <CardHeader
                    className={"card-header"}
                    title={<p className={"event-title"}><FontAwesomeIcon icon={['far', 'star']}/>{ event}</p>}
                    subheader={
                        <div>
                            <p className={"event-location"}><FontAwesomeIcon icon={['fas', 'map-marker-alt']}/>{ location}</p>
                            <p className={"event-date"}><FontAwesomeIcon icon={['fas', 'calendar-day']}/>{ date}</p>
                        </div>
                    }
                />
                <CardContent className={"card-content"}>
                    <div style={{background: `rgba(0, 0, 0, 0) url(${ image}) no-repeat scroll center center`}}
                         className={"event-image"} />
                    {/*<p className={"event-description"}>{ description}</p>*/}
                </CardContent>
            </div>
            <CardActions disableSpacing className={"card-actions"}>
                <IconButton
                    aria-label="write a review"
                    onClick={handleModal}
                >
                    <CreateRoundedIcon />
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {
                        reviews ? reviews :
                        data.filter((obj) => obj.event_id ===  id)
                            .map((obj) => {
                                return <q className="review" key={obj.id}>{obj.text}</q>
                            })
                    }
                </CardContent>
            </Collapse>
            <ReactModal
                isOpen={open}
                onRequestClose={handleModal}
                contentLabel={"Modal window with reviews for the event"}
                className={"modal-container"}
                overlayClassName={"modal-overlay"}
                shouldCloseOnOverlayClick={false}
                ariaHideApp={true}
                shouldFocusAfterRender={true}
                shouldCloseOnEsc={true}
                shouldReturnFocusAfterClose={true}
                preventScroll={false}
            >
                <div className={"review-header"}>
                    <p>{translate[locale]["review_header"]}</p>
                    <IconButton
                        aria-label="close review modal"
                        onClick={handleModal}
                        className={"review-close-btn"}
                    >
                        <CloseRoundedIcon />
                    </IconButton>
                </div>
                <div className={"review-event-info"}>
                    <p>{translate[locale]["review_explain_info"]}:</p>
                    <p>{translate[locale]["event_field_label"]}: { event} ({ type})</p>
                    <p>{translate[locale]["location_field_label"]}: { location}</p>
                    <p>{translate[locale]["date_field_label"]}: { date}</p>
                </div>
                <form className={"review-form"}>
                    <div className={"review-container"}>
                        <label htmlFor={"review-text"}>{translate[locale]["review_explain_text"]}:</label>
                        <textarea name={"review-text"} id={"review-text-" + id} placeholder={translate[locale]["note_field_placeholder"]}/>
                    </div>
                    <div>
                        <button onClick={handleModal}>{translate[locale]["cancel"]}</button>
                        <input type={"submit"} value={translate[locale]["submit"]} onClick={handleSubmit}/>
                    </div>
                </form>
            </ReactModal>
        </Card>
    );
}