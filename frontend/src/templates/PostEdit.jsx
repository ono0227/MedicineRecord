import React, { useCallback, useEffect, useState } from "react";
import { PrimaryButton, TextInput } from "../components/UIkit";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../reducks/posts/operations"
import { getPosts } from "../reducks/posts/selectors";
import { push } from "connected-react-router";

const PostEdit = () => {
    const dispatch = useDispatch();

    const selector = useSelector((state) => state)
    const path = selector.router.location.pathname
    const id = path.split('/posts/edit/')[1]

    const posts = getPosts(selector);

    const [medicineName, setMedicineName] = useState(""),
          [medicineImage, setMedicineImage] = useState(""),
          [ingestionAmount, setIngestionAmount] = useState(""),
          [comment, setComment] = useState("");

    const inputIngestionAmount = useCallback((event) => {
        setIngestionAmount(event.target.value)
    }, [setIngestionAmount])

    const inputComment = useCallback((event) => {
        setComment(event.target.value)
    }, [setComment])

    useEffect(() => {
        const targetPost = posts.find(post => String(post.id) === id);
        if (targetPost) {
            setMedicineName(targetPost.medicine.name);
            setMedicineImage(targetPost.medicine.medicine_image)
            setIngestionAmount(String(targetPost.ingestion_amount));
            setComment(targetPost.comment);
        }
    }, [id, posts, setMedicineName, setIngestionAmount, setComment]);

    return(
        <section>
            <h2 className="u-text_headline u-text-center">投薬記録の編集</h2>
            <div className="c-section-container">
                <img src={medicineImage} alt="薬の画像"/>
                <h2 className="u-text__headline">薬の名前：{medicineName}</h2>

                <TextInput
                    fullWidth={true} label={"服薬量"} multiline={false} required={true}
                    onChange={inputIngestionAmount} rows={1} value={ingestionAmount} type={"number"}
                />

                <TextInput
                    fullWidth={true} label={"コメント"} multiline={true} required={false}
                    onChange={inputComment} rows={5} value={comment} type={"text"}
                />

                <div className="module-spacer--small"/>
                <div className="center">
                    <PrimaryButton
                        label={"投薬記録を更新"}
                        onClick={() => dispatch(updatePost(id, ingestionAmount, comment, medicineName, medicineImage))}
                    />
                    <div className="module-spacer--medium"/>
                    <p onClick={() => dispatch(push('/medicines/'+ id))}>戻る</p>
                </div>
            </div>
        </section>
    )
}

export default PostEdit
