import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { push } from 'connected-react-router';
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            margin: 8,
            width: 'calc(50%-16px)'
        },
        [theme.breakpoints.up('sm')]: {
            margin: 16,
            width: 'calc(33.3333% - 32px)'
        }
    },
    content: {
        display: "flex",
        padding: '16px 8px',
        textAlign: 'left',
        '&:last-child': {
            paddingBottom: 16
        }
    },
    media: {
        height: 0,
        paddingTop: '100%'
    }
}))

const PostSummary = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <Card className={classes.root}>
            {props.medicineImage && props.medicineImage.url ? (
                <CardMedia
                    className={classes.media}
                    image={props.medicineImage.url}
                    title=""
                    onClick={() => dispatch(push('/posts/' + props.id))}
                />
            ) : (
                <div className={classes.media} onClick={() => dispatch(push('/posts/' + props.id))}>
                    画像なし
                </div>
            )}
            <CardContent className={classes.content}>
                <div onClick={() => dispatch(push('/posts/' + props.id))}>
                    {props.medicineName}
                    {props.ingestionAmount}
                    {props.comment}
                </div>
            </CardContent>
        </Card>
     )
}

export default PostSummary;
