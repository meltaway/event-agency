import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
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

// export default function EventCard(props) {
//     const classes = useStyles();
//     const [expanded, setExpanded] = React.useState(false);
//
//     const handleExpandClick = () => {
//         setExpanded(!expanded);
//     };
//
//     return (
//         <Card className={classes.root}>
//             <CardHeader
//                 title={<p><i className="far fa-star"/>{props.event}</p>}
//                 subheader={
//                     <div>
//                         <p><i className="fas fa-map-marker-alt"/>{props.restaurant.name}</p>
//                         <p><i className="fas fa-calendar-day"/>{props.date}</p>
//                     </div>
//                 }
//             />
//             <CardContent>
//                 <p>{props.restaurant.description}</p>
//             </CardContent>
//             <CardActions disableSpacing>
//                 <IconButton
//                     className={clsx(classes.expand, {
//                         [classes.expandOpen]: expanded,
//                     })}
//                     onClick={handleExpandClick}
//                     aria-expanded={expanded}
//                     aria-label="show more"
//                 >
//                     <ExpandMoreIcon />
//                 </IconButton>
//             </CardActions>
//             <Collapse in={expanded} timeout="auto" unmountOnExit>
//                 <CardContent>
//                     {
//                         props.reviews.map((obj) => {
//                             return <q className="review">obj.text</q>
//                         })
//                     }
//                 </CardContent>
//             </Collapse>
//         </Card>
//     );
// }