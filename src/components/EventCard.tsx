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

import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import './../scss/events.scss';
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

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={"card"}>
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
                <IconButton aria-label="add to favorites">
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
        </Card>
    );
}