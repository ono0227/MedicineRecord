import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import {useDispatch, useSelector} from "react-redux";
import { PrimaryButton } from '../components/UIkit';
import { getPosts } from "../reducks/posts/selectors";
import {returnCodeToBr} from "../helper";
import { push } from 'connected-react-router';
import { deletePost } from '../reducks/posts/operations';

const useStyles = makeStyles((theme) => ({
    detail: {
        textAlign: 'left',
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto 16px auto',
            height: 320,
            width: 320
        },
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto',
            height: 'auto',
            width: 400
        },
    },
}))

const PostDetail = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const path = selector.router.location.pathname
    const id = path.split('/posts/')[1]

    const posts = getPosts(selector);

    const [medicineName, setMedicineName] = useState(""),
          [medicineImage, setMedicineImage] = useState(""),
          [ingestionAmount, setIngestionAmount] = useState(""),
          [comment, setComment] = useState("");

     useEffect(() => {
        const targetPost = posts.find(post => String(post.id) === id);
            if (targetPost) {
                setMedicineName(targetPost.medicine.name);
                setMedicineImage(targetPost.medicine.medicine_image)
                setIngestionAmount(String(targetPost.ingestion_amount));
                setComment(targetPost.comment);
            }
        }, [id, posts, setMedicineName, setIngestionAmount, setComment]);

    return (
        <section className="c-section-wrapin">
            {id && (
                <div className="p-grid__row">
                    <img src={medicineImage} alt="薬の画像"/>
                    <div className={classes.detail}>
                        <h2 className="u-text__headline">薬の名前：{medicineName}</h2>
                        <p>実際の服薬量：{ingestionAmount}</p>
                        <div className="module-spacer--small"/>
                        <p>コメント：{returnCodeToBr(comment)}</p>
                    </div>
                    <div className="module-spacer--small"/>
                    <div className="center">
                        <PrimaryButton
                            label={"服薬記録を編集"}
                            onClick={() => dispatch(push('/posts/edit/' + String(id)))}
                        />
                        <div className="module-spacer--medium"/>
                        <PrimaryButton
                            label={"服薬記録を削除"}
                            onClick={() => dispatch(deletePost(id))}
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default PostDetail;
