import React, { useEffect, useState } from 'react';
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { PrimaryButton } from '../components/UIkit';
import { getPosts } from "../reducks/posts/selectors";
import { deletePost } from '../reducks/posts/operations';
import { Paper, Grid, Typography, Box } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';

const DetailPaper = styled(Paper)(({ theme }) => ({
    textAlign: 'left',
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        margin: '0 auto 16px auto',
        width: 320
    },
    [theme.breakpoints.up('sm')]: {
        margin: '0 auto',
        width: 400
    },
}));

const PostDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const selector = useSelector((state) => state);
    const posts = getPosts(selector);

    const [medicineName, setMedicineName] = useState(""),
          [medicineImage, setMedicineImage] = useState(""),
          [ingestionAmount, setIngestionAmount] = useState(""),
          [comment, setComment] = useState("");

    useEffect(() => {
        const targetPost = posts.find(post => String(post.id) === id);
        if (targetPost) {
            setMedicineName(targetPost.medicine.name);
            setMedicineImage(targetPost.medicine.medicine_image);
            setIngestionAmount(String(targetPost.ingestion_amount));
            setComment(targetPost.comment);
        }
    }, [id, posts, setMedicineName, setMedicineImage, setIngestionAmount, setComment]);

    const handleDeletePost = () => {
        dispatch(deletePost(id));
        navigate('/timeline');
    };

    return (
        <section className="c-section-wrapin">
            {id && (
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}>
                        {medicineImage && <img src={medicineImage} alt="薬の画像" style={{ maxWidth: '100%' }} />}
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <DetailPaper>
                            <Typography variant="h6" component="h2">薬の名前：{medicineName}</Typography>
                            <Typography variant="body1">実際の服薬量：{ingestionAmount}</Typography>
                            <div className="module-spacer--small" />
                            <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>コメント：{comment}</Typography>
                            <div className="module-spacer--small" />
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <PrimaryButton
                                    label={"服薬記録を編集"}
                                    onClick={() => navigate(`/posts/edit/${id}`)}
                                />
                                <PrimaryButton
                                    label={"服薬記録を削除"}
                                    onClick={handleDeletePost}
                                    color="error"
                                />
                            </Box>
                        </DetailPaper>
                    </Grid>
                </Grid>
            )}
        </section>
    );
};

export default PostDetail;
