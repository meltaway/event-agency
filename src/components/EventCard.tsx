import React, {useState} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import ReactModal from 'react-modal';

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

export default function EventCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [open, openModal] = useState(false);
    const [scroll, setScroll] = useState(true);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    function noScroll() {
        window.scrollTo(0, 0);
    }

    const toggleModal = () => {
        openModal(!open)
        !open ?
            document.getElementsByClassName('App')[0].classList.add('no-scroll') :
            document.getElementsByClassName('App')[0].classList.remove('no-scroll');
    };

    return (
        <Card className={"card"} id={props.uid} key={props.uid}>
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
                    aria-label="add to favorites"
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
                        props.reviews.map((obj) => {
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
                parentSelector={() => document.getElementById(props.uid)}
            >
                <p onClick={toggleModal}>Modal Content</p>
            </ReactModal>
        </Card>
    );
}