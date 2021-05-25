import React, {useState} from 'react';
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

import './../scss/events.scss';
import './../scss/modal.scss';
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

export default function EventCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [open, openModal] = useState(false);
    const [scroll, setScroll] = useState(true);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const toggleModal = () => {
        openModal(!open)
    };

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

    const addReview = () => {
        fetch('http://localhost:3001/reviews')
            .then((response) => response.json())
            .then((items) => {
                const text = (document.getElementById("review-text-" + props.id) as HTMLInputElement).value.trim()
                console.log('text:', text)
                if (text.length !== 0)
                    fetch('http://localhost:3001/reviews', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formatReview(text, props.id), null, 4),
                    });
                else
                    alert('error ' + text)
        });
    }


    return (
        <Card className={"card"} data-id={props.id} key={props.id}>
            <div>
                <CardHeader
                    className={"card-header"}
                    title={<p className={"event-title"}><FontAwesomeIcon icon={['far', 'star']}/>{props.event}</p>}
                    subheader={
                        <div>
                            <p className={"event-location"}><FontAwesomeIcon icon={['fas', 'map-marker-alt']}/>{props.location}</p>
                            <p className={"event-date"}><FontAwesomeIcon icon={['fas', 'calendar-day']}/>{props.date}</p>
                        </div>
                    }
                />
                <CardContent className={"card-content"}>
                    <p className={"event-description"}>{props.description}</p>
                </CardContent>
            </div>
            <CardActions disableSpacing className={"card-actions"}>
                <IconButton
                    aria-label="write a review"
                    onClick={toggleModal}
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
                        data.filter((obj) => obj.event_id === props.id)
                            .map((obj) => {
                                return <q className="review" key={obj.id}>{obj.text}</q>
                            })
                    }
                </CardContent>
            </Collapse>
            <ReactModal
                isOpen={open}
                onRequestClose={toggleModal}
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
                    <p>Submit a review</p>
                    <IconButton
                        aria-label="close review modal"
                        onClick={toggleModal}
                        className={"review-close-btn"}
                    >
                        <CloseRoundedIcon />
                    </IconButton>
                </div>
                <div className={"review-event-info"}>
                    <p>This is the event you will be leaving a review for:</p>
                    <p>Event name: {props.event}</p>
                    <p>Location: {props.location}</p>
                    <p>Date: {props.date}</p>
                </div>
                <form className={"review-form"}>
                    <div className={"review-container"}>
                        <label htmlFor={"review-text"}>Write your review here:</label>
                        <textarea name={"review-text"} id={"review-text-" + props.id}/>
                    </div>
                    <div>
                        <button onClick={toggleModal}>Cancel</button>
                        <input type={"submit"} value={"Submit"} onClick={addReview}/>
                    </div>
                </form>
            </ReactModal>
        </Card>
    );
}