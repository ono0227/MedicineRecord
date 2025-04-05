import React, { useEffect } from "react";
import backgroundimage from "../assets/img/backgroundimage.jpeg"
import { BackGroundImage } from "../components/UIkit";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../reducks/posts/operations";
import { getPosts } from "../reducks/posts/selectors";
import { PostSummary} from "../components/Post";
import { push } from "connected-react-router";

const TimeLine = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const posts = getPosts(selector);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <section className="c-section-wrapin">
            <BackGroundImage image={backgroundimage} />
            <div className="p-grid__row">
                {posts.length > 0 && (
                    posts.map(post => (
                        <PostSummary
                            key={post.id} id={post.id} ingestionAmount={post.ingestion_amount}
                            comment={post.comment}
                            medicineName={post.medicine.name}
                            medicineImage={post.medicine_image}
                        />
                    ))
                )}
                <div className="center">
                    <p onClick={() => dispatch(push('/posts/create'))}>服薬を記録する</p>
                </div>
            </div>
        </section>
    )
}

export default TimeLine;
