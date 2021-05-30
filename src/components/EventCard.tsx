import React, {useEffect, useState} from 'react';
import {useQuery} from "react-query";
import ReactModal from 'react-modal';

import { LoadingMessage, ErrorMessage } from './Messages';
import {formatReview} from "../utils/review";

import clsx from 'clsx';
import axios from "axios";

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { IconButton, Collapse, CardActions, CardContent, CardHeader, Card } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

import translate from './../json/translate_config.json';

import '../scss/blocks/events.scss';
import '../scss/blocks/eventcard.scss';
import '../scss/blocks/modal.scss';

import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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

export default function EventCard({id, event, image, type, location, date, description, key, loc}) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState<boolean>(false);
    const [open, openModal] = useState<Boolean>(false);
    const [scroll, setScroll] = useState(true);
    const [locale, setLocale] = useState<string>('en-US');
    const [text, setText] = useState<string>("");

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

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleModal = () => {
        openModal(!open)
    };

    const toggleScroll = () => {
        setScroll(!scroll);
        scroll ? document.body.classList.add('no-scroll') : document.body.classList.remove('no-scroll');
    }

    const submitReview = (e) => {
        e.preventDefault();
        const review = formatReview(text, id);
        if (!!text) {
            axios.post('http://localhost:3001/reviews', { review })
                .then(res=>{
                    setText("");
                    openModal(false);
                })
        } else {
            alert(translate[locale]['review_error']);
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
                        data.filter((obj) => obj.review.event_id ===  id)
                            .map((obj) => {
                                return <q className="review" key={obj.id}>{obj.review.text}</q>
                            })
                    }
                </CardContent>
            </Collapse>
            <ReactModal
                isOpen={open}
                onAfterOpen={toggleScroll}
                onAfterClose={toggleScroll}
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
                <form className={"review-form"} onSubmit={submitReview}>
                    <div className={"review-container"}>
                        <label htmlFor={"review-text"}>{translate[locale]["review_explain_text"]}:</label>
                        <textarea name={"review-text"} id={"review-text-" + id}
                                  value={text}
                                  onChange={(e) => setText(e.target.value)}
                                  placeholder={translate[locale]["note_field_placeholder"]}/>
                    </div>
                    <div>
                        <button onClick={handleModal}>{translate[locale]["cancel"]}</button>
                        <input type={"submit"} value={translate[locale]["submit"]}/>
                    </div>
                </form>
            </ReactModal>
        </Card>
    );
}